using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SpacePhotos.EF;
using SpacePhotos.EF.Entities;

namespace SpacePhotos.Api.Services
{
    public class CachedHttpClientService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly AppDbContext _context;

        public CachedHttpClientService(IHttpClientFactory httpClientFactory, AppDbContext context)
        {
            _httpClientFactory = httpClientFactory;
            _context = context;
        }

        public async Task<T?> GetAsync<T>(string url, TimeSpan cacheTime)
        {
            var cachedData = await _context.QueryCaches.SingleOrDefaultAsync(item => item.Query == url);

            if (cachedData != null && IsDataFresh(cachedData, cacheTime) && !string.IsNullOrEmpty(cachedData.Result))
            {
                try
                {
                    return DeserializeData<T>(cachedData.Result);
                }
                catch (Exception)
                {
                    _context.QueryCaches.Remove(cachedData);
                    await _context.SaveChangesAsync();

                    throw;
                }
            }

            var actualData = await _httpClientFactory.CreateClient().GetStringAsync(url);
            var result = DeserializeData<T>(actualData);

            if (cachedData != null)
            {
                cachedData.Update(actualData);
            }
            else
            {
                _context.QueryCaches.Add(new QueryCache(url, actualData));
            }

            await _context.SaveChangesAsync();

            return result;
        }

        private static T? DeserializeData<T>(string json)
        {
            return JsonConvert.DeserializeObject<T>(json);
        }

        private static bool IsDataFresh(QueryCache cachedData, TimeSpan cacheTime)
        {
            return cachedData.CreatedOn + cacheTime > DateTime.Now;
        }
    }
}
