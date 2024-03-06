namespace SpacePhotos.Api
{
    public class AppSettings
    {
        public string ApiKey { get; set; } = null!;
        public Endpoints Endpoints { get; set; } = null!;
    }

    public class Endpoints
    {
        //Astronomy Picture of the Day
        public string APOD { get; set; } = null!;
        //Earth pictures
        public string EPIC { get; set; } = null!;
        //Earth pictures root url for getting images
        public string EPICImageRoot { get; set; } = null!;
    }
}
