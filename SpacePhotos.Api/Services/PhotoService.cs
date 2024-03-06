using Microsoft.Extensions.Options;
using SpacePhotos.Api.Dtos;
using SpacePhotos.Api.Dtos.Nasa;
using System.Globalization;

namespace SpacePhotos.Api.Services
{
    public class PhotoService
    {
        private readonly AppSettings _settings;
        private readonly IHttpClientFactory _httpClientFactory;

        public PhotoService(IOptions<AppSettings> options, IHttpClientFactory httpClientFactory)
        {
            _settings = options.Value;
            _httpClientFactory = httpClientFactory;
        }

        public async Task<PhotoOfTheDayDto> GetPhotoOfTheDayAsync()
        {
            var url = $"{_settings.Endpoints.APOD}?api_key={_settings.ApiKey}";

            var data = await _httpClientFactory.CreateClient().GetFromJsonAsync<PhotoOfTheDayNasaDto>(url)
                ?? throw new ApplicationException("Cannot retrieve photo from NASA API");

            return new PhotoOfTheDayDto()
            {
                Copyright = data.Copyright,
                Date = DateTime.Parse(data.Date, CultureInfo.InvariantCulture),
                Explanation = data.Explanation,
                HDUrl = data.HDUrl,
                Title = data.Title,
                Url = data.Url
            };
        }

        public async Task<IEnumerable<EarthDto>> GetEarthPhotosAsync()
        {
            var url = $"{_settings.Endpoints.EPIC}?api_key={_settings.ApiKey}";

            var data = await _httpClientFactory.CreateClient().GetFromJsonAsync<IEnumerable<EarthNasaDto>>(url)
                ?? throw new ApplicationException("Cannot retrieve photo from NASA API");

            return data
                .Select(item => new
                {
                    photo = item,
                    date = DateTime.Parse(item.Date, CultureInfo.InvariantCulture),
                })
                .Select(item => new EarthDto()
                {
                    Caption = item.photo.Caption,
                    Date = item.date,
                    Identifier = item.photo.Identifier,
                    Image = item.photo.Image,
                    Lat = item.photo.Coords.CentroidCoordinates.Lat,
                    Lon = item.photo.Coords.CentroidCoordinates.Lon,
                    Version = item.photo.Version,
                    Url = $"{_settings.Endpoints.EPICImageRoot}/archive/natural/{item.date.Year:0000}/{item.date.Month:00}/{item.date.Day:00}/jpg/{item.photo.Image}.jpg",
                    HDUrl = $"{_settings.Endpoints.EPICImageRoot}/archive/natural/{item.date.Year:0000}/{item.date.Month:00}/{item.date.Day:00}/png/{item.photo.Image}.png",
                });
        }
    }
}
