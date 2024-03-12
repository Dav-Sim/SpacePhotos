using Microsoft.EntityFrameworkCore;
using Serilog;
using SpacePhotos.Api.Middleware;
using SpacePhotos.Api.Services;
using SpacePhotos.EF;
using System.Diagnostics;

namespace SpacePhotos.Api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);


        builder.Services.AddControllers()
            .AddNewtonsoftJson();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddHttpClient();
        builder.Services.AddTransient<PhotoService>();
        builder.Services.AddTransient<CachedHttpClientService>();

        builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

        builder.Services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("DatabaseConnection"));
            if (builder.Environment.IsDevelopment())
            {
                options.LogTo(log => Debug.WriteLine(log)).EnableSensitiveDataLogging();
            }
        });

        if (!builder.Environment.IsEnvironment("Testing"))
        {
            builder.Host.UseSerilog((context, configuration) =>
            {
                configuration
                .WriteTo.MSSqlServer(builder.Configuration.GetConnectionString("DatabaseConnection"), new Serilog.Sinks.MSSqlServer.MSSqlServerSinkOptions()
                {
                    AutoCreateSqlTable = true,
                    TableName = "Serilog",
                    SchemaName = "dbo"
                },
                restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Warning);
            });
        }


        var app = builder.Build();

        app.UseErrorHandler();

        app.UseDefaultFiles();
        app.UseStaticFiles();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();
        app.MapFallbackToFile("index.html");

        app.Run();
    }
}
