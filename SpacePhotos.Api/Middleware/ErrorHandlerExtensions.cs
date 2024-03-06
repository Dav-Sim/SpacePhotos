namespace SpacePhotos.Api.Middleware;

public static class ErrorHandlerExtensions
{
    public static IApplicationBuilder UseErrorHandler(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ErrorHandler>();
    }
}

