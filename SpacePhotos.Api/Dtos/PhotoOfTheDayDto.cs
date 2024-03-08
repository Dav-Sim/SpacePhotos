using System.Text.Json.Serialization;

namespace SpacePhotos.Api.Dtos;

public class PhotoOfTheDayDto
{
    public string Copyright { get; set; } = null!;
    public DateTime Date { get; set; }
    public string Explanation { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Url { get; set; } = null!;
    [JsonPropertyName("hdurl")]
    public string HDUrl { get; set; } = null!;
    public string MediaType { get; set; } = null!;
    public string? VideoThumbnail { get; set; }
}
