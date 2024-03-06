using System.Text.Json.Serialization;

namespace SpacePhotos.Api.Dtos.Nasa;

public class PhotoOfTheDayNasaDto
{
    public string Copyright { get; set; } = null!;
    public string Date { get; set; } = null!;
    public string Explanation { get; set; } = null!;
    [JsonPropertyName("hdurl")]
    public string HDUrl { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Url { get; set; } = null!;
}
