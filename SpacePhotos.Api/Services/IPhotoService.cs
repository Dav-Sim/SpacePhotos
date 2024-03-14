using SpacePhotos.Api.Dtos;

namespace SpacePhotos.Api.Services
{
    public interface IPhotoService
    {
        Task<IEnumerable<EarthPhotoDto>> GetEarthPhotosAsync(DateTime? date = null);
        IEnumerable<RoverCameraDto> GetPerseveranceCameras();
        Task<IEnumerable<RoverPhotoDto>> GetPerseverancePhotosAsync(string camera, DateTime? date);
        Task<IEnumerable<DayPhotoDto>> GetPhotoOfTheDayAsync(DateTime? from = null, DateTime? to = null);
    }
}