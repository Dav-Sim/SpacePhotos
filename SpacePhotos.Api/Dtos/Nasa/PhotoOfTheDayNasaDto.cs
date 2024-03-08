using System.Text.Json.Serialization;

namespace SpacePhotos.Api.Dtos.Nasa;

public class PhotoOfTheDayNasaDto
{
    public string Copyright { get; set; } = null!;
    public string Date { get; set; } = null!;
    public string Explanation { get; set; } = null!;
    [JsonPropertyName("hdurl")]
    public string HDUrl { get; set; } = null!;
    [JsonPropertyName("media_type")]
    public string MediaType { get; set; } = null!;
    [JsonPropertyName("thumbnail_url")]
    public string? VideoThumbnail { get; set; }
    public string Title { get; set; } = null!;
    public string Url { get; set; } = null!;
}
