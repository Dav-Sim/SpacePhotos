
namespace SpacePhotos.Api.Services
{
    public interface ICachedHttpClientService
    {
        Task<T?> GetAsync<T>(string url, TimeSpan cacheTime);
    }
}