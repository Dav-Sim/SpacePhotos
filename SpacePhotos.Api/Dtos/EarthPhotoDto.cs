using Newtonsoft.Json;

namespace SpacePhotos.Api.Dtos;

public class EarthPhotoDto
{
    public string Identifier { get; set; } = null!;
    public string Caption { get; set; } = null!;
    public string Image { get; set; } = null!;
    public string Version { get; set; } = null!;
    public DateTime Date { get; set; }
    public double Lat { get; set; }
    public double Lon { get; set; }
    public string Url { get; set; } = null!;
    [JsonProperty("hdurl")]
    public string HDUrl { get; set; } = null!;
}
