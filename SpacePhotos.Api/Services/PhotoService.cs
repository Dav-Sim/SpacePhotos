using Microsoft.Extensions.Options;
using SpacePhotos.Api.Dtos;
using SpacePhotos.Api.Dtos.Nasa;
using System.Globalization;

namespace SpacePhotos.Api.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly AppSettings _settings;
        private readonly ICachedHttpClientService _cachedHttp;

        public PhotoService(IOptions<AppSettings> options, ICachedHttpClientService cachedHttp)
        {
            _settings = options.Value;
            _cachedHttp = cachedHttp;
        }

        public async Task<IEnumerable<DayPhotoDto>> GetPhotoOfTheDayAsync(DateTime? from = null, DateTime? to = null)
        {
            var url = $"{_settings.Endpoints.APOD}?api_key={_settings.ApiKey}&thumbs=true";

            IEnumerable<NasaDayPhotoDto> data;

            if (from != null || to != null)
            {
                url += $"&start_date={from:yyyy-MM-dd}&end_date={to:yyyy-MM-dd}";

                var cacheTime = to < DateTime.Now ? TimeSpan.FromDays(1) : TimeSpan.FromHours(1);

                data = await _cachedHttp.GetAsync<IEnumerable<NasaDayPhotoDto>>(url, cacheTime)
                    ?? throw new ApplicationException("Cannot retrieve photo from NASA API");
            }
            else
            {
                var item = await _cachedHttp.GetAsync<NasaDayPhotoDto>(url, TimeSpan.FromHours(1))
                    ?? throw new ApplicationException("Cannot retrieve photo from NASA API");

                data = new List<NasaDayPhotoDto>()
                {
                    item
                };
            }

            return data.Select(photo => new DayPhotoDto()
            {
                Url = photo.Url,
                HDUrl = photo.HDUrl,
                Title = photo.Title,
                Copyright = photo.Copyright,
                Explanation = photo.Explanation,
                MediaType = photo.MediaType,
                VideoThumbnail = photo.VideoThumbnail,
                Date = DateTime.Parse(photo.Date, CultureInfo.InvariantCulture),
            });
        }

        public async Task<IEnumerable<EarthPhotoDto>> GetEarthPhotosAsync(DateTime? date = null)
        {
            var url = $"{_settings.Endpoints.EPIC}/date/{date?.ToString("yyyy-MM-dd")}?api_key={_settings.ApiKey}";

            var cacheTime = date?.Date < DateTime.Now.Date ? TimeSpan.FromDays(10) : TimeSpan.FromHours(1);

            var data = await _cachedHttp.GetAsync<IEnumerable<NasaEarthPhotoDto>>(url, cacheTime)
                ?? throw new ApplicationException("Cannot retrieve photo from NASA API");

            return data
                .Select(item => new
                {
                    photo = item,
                    date = DateTime.Parse(item.Date, CultureInfo.InvariantCulture),
                })
                .Select(item => new EarthPhotoDto()
                {
                    Date = item.date,
                    Image = item.photo.Image,
                    Caption = item.photo.Caption,
                    Identifier = item.photo.Identifier,
                    Lat = item.photo.Coords.CentroidCoordinates.Lat,
                    Lon = item.photo.Coords.CentroidCoordinates.Lon,
                    Version = item.photo.Version,
                    Url = $"{_settings.Endpoints.EPICImageRoot}/archive/natural/{item.date.Year:0000}/{item.date.Month:00}/{item.date.Day:00}/jpg/{item.photo.Image}.jpg",
                    HDUrl = $"{_settings.Endpoints.EPICImageRoot}/archive/natural/{item.date.Year:0000}/{item.date.Month:00}/{item.date.Day:00}/png/{item.photo.Image}.png",
                });
        }

        public async Task<IEnumerable<RoverPhotoDto>> GetPerseverancePhotosAsync(string camera, DateTime? date)
        {
            var url = $"{_settings.Endpoints.Perseverance}?earth_date={(date ?? DateTime.Now):yyyy-MM-dd}&camera={camera}&api_key={_settings.ApiKey}";

            var cacheTime = date?.Date < DateTime.Now.AddDays(-3).Date ? TimeSpan.FromDays(10) : TimeSpan.FromHours(1);

            var data = await _cachedHttp.GetAsync<NasaRoverPhotosDto>(url, cacheTime)
                ?? throw new ApplicationException("Cannot retrieve photo from NASA API");

            return data.Photos
                .Select(item => new RoverPhotoDto()
                {
                    Id = item.Id,
                    Sol = item.Sol,
                    Url = item.ImgSrc,
                    EarthDate = item.EarthDate,
                    CameraId = item.Camera.Id,
                    CameraName = item.Camera.Name,
                    CameraFullName = item.Camera.FullName,
                    RoverId = item.Rover.Id,
                    RoverName = item.Rover.Name,
                    RoverLandingDate = item.Rover.LandingDate,
                    RoverLaunchDate = item.Rover.LaunchDate,
                    RoverMaxDate = item.Rover.MaxDate,
                    RoverMaxSol = item.Rover.MaxSol,
                    RoverStatus = item.Rover.Status,
                    RoverTotalPhotos = item.Rover.TotalPhotos,
                });
        }

        public IEnumerable<RoverCameraDto> GetPerseveranceCameras()
        {
            return _settings.PerseveranceCameras.Select(camera => new RoverCameraDto()
            {
                Key = camera.Key,
                Name = camera.Name,
            });
        }
    }
}
