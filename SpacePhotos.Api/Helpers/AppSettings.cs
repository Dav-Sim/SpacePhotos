namespace SpacePhotos.Api.Helpers
{
    public class AppSettings
    {
        public Endpoints Endpoints { get; set; } = null!;
    }

    public class Endpoints
    {
        //Astronomy Picture of the Day
        public string APOD { get; set; } = null!;
    }
}
