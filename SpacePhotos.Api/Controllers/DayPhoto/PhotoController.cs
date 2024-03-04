using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SpacePhotos.Api.Controllers.Photo.Dtos;
using SpacePhotos.Api.Helpers;

namespace SpacePhotos.Api.Controllers.Photos;

[ApiController]
[Route("api/photo")]
public class PhotoController : ControllerBase
{
    private readonly AppSettings _settings;
    private readonly IHttpClientFactory _httpClientFactory;
    public PhotoController(IOptions<AppSettings> options, IHttpClientFactory httpClientFactory)
    {
        _settings = options.Value;
        _httpClientFactory = httpClientFactory;
    }

    [HttpGet("apod")]
    public async Task<ActionResult<PhotoOfTheDayDto>> GetPhotoOfTheDay()
    {
        var url = _settings.Endpoints.APOD ?? throw new ApplicationException("Configuration not loaded correctly");

        var data = await _httpClientFactory.CreateClient().GetFromJsonAsync<PhotoOfTheDayDto>(url);

        return Ok(data);
    }
}
