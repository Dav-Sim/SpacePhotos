using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using SpacePhotos.Api;
using SpacePhotos.Api.Dtos;
using SpacePhotos.Api.Dtos.Nasa;
using SpacePhotos.EF;
using System.Net;
using System.Net.Http.Json;

namespace SpacePhotos.Tests;

public class ApiTests : IClassFixture<TestWebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly AppDbContext _context;
    private readonly AppSettings _settings;

    public ApiTests(TestWebApplicationFactory<Program> factory)
    {
        _client = factory.CreateDefaultClient();
        var scope = factory.Services.CreateScope();
        _context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        _settings = scope.ServiceProvider.GetRequiredService<IOptions<AppSettings>>().Value;
        new TestDatabaseSeeder(_context).Seed();
    }

    [Fact]
    public async Task Api_should_return_cached_photo_of_the_day()
    {
        //Arrange
        var data = new PhotoOfTheDayNasaDto()
        {
            Title = "TEST",
            Date = DateTime.Now.ToString("O")
        };
        var url = $"{_settings.Endpoints.APOD}?api_key={_settings.ApiKey}&thumbs=true";

        _context.QueryCaches.Add(new EF.Entities.QueryCache(url, JsonConvert.SerializeObject(data)));
        await _context.SaveChangesAsync();

        var message = new HttpRequestMessage(HttpMethod.Get, $"api/photo/apod");

        //Act
        var response = await _client.SendAsync(message);
        var result = await response.Content.ReadFromJsonAsync<IEnumerable<PhotoOfTheDayDto>>();

        //Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(result);
        Assert.Single(result);
        Assert.Equal(data.Title, result.Single().Title);
    }

    [Fact]
    public async Task Api_should_return_cached_earth_photos()
    {
        //Arrange
        DateTime? date = null;
        var data = new List<EarthNasaDto>() {
            new EarthNasaDto() {
                Caption = "TEST",
                Coords = new EarthCoordsNasaDto() {
                    CentroidCoordinates = new EarthCentroidCoordinatesNasaDto() {
                        Lat = 1,
                        Lon = 1
                    }
                },
                Date = DateTime.Now.ToString("O")
            }
        };
        var url = $"{_settings.Endpoints.EPIC}/date/{date?.ToString("yyyy-MM-dd")}?api_key={_settings.ApiKey}";

        _context.QueryCaches.Add(new EF.Entities.QueryCache(url, JsonConvert.SerializeObject(data)));
        await _context.SaveChangesAsync();

        var message = new HttpRequestMessage(HttpMethod.Get, $"api/photo/epic");

        //Act
        var response = await _client.SendAsync(message);
        var result = await response.Content.ReadFromJsonAsync<IEnumerable<EarthDto>>();

        //Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(result);
        Assert.NotEmpty(result);
        Assert.Equal(data.First().Caption, result.First().Caption);
    }
}
