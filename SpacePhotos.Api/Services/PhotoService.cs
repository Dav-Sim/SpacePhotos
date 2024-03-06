using Microsoft.Extensions.Options;
using SpacePhotos.Api.Dtos;

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
            var url = _settings.Endpoints.APOD ?? throw new ApplicationException("Configuration not loaded correctly");

            var data = await _httpClientFactory.CreateClient().GetFromJsonAsync<PhotoOfTheDayDto>(url) ?? throw new ApplicationException("Cannot retrieve photo from NASA API");

            return data;
        }
    }
}
