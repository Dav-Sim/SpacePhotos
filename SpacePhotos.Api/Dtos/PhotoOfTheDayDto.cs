using System.Text.Json.Serialization;

namespace SpacePhotos.Api.Dtos;

public class PhotoOfTheDayDto
{
    public string Copyright { get; set; }
    public string Date { get; set; }
    public string Explanation { get; set; }
    [JsonPropertyName("hdurl")]
    public string HDUrl { get; set; }
    public string Title { get; set; }
    public string Url { get; set; }
}
