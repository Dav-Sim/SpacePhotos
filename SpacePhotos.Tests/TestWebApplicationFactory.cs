using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using SpacePhotos.EF;

namespace SpacePhotos.Tests;

public class TestWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");

        SetupTestingConfiguration(builder);

        builder.ConfigureTestServices(services =>
        {
            SetupDatabase(services);

            SetupHttpClient(services);

            SetupLogger(services);
        });
    }

    private void SetupLogger(IServiceCollection services)
    {
        services.AddSingleton<ILoggerFactory, NullLoggerFactory>();
    }

    private static void SetupTestingConfiguration(IWebHostBuilder builder)
    {
        builder.ConfigureAppConfiguration(config =>
        {
            //add testing json file here from this test project
            config.SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.testing.json");
        });
    }

    private static void SetupHttpClient(IServiceCollection services)
    {
        // Unregister existing service
        var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(IHttpClientFactory));
        if (descriptor != null) services.Remove(descriptor);

        var mockFactory = new Mock<IHttpClientFactory>(MockBehavior.Strict);

        //register new http client factory
        services.AddTransient<IHttpClientFactory>((s) => mockFactory.Object);
    }

    private static void SetupDatabase(IServiceCollection services)
    {
        // Unregister existing database service (SQL Server).
        var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));
        if (descriptor != null) services.Remove(descriptor);

        // Register new in-memory database
        services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("memory"));
    }
}