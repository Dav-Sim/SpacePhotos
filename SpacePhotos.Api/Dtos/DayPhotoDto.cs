using Newtonsoft.Json;

namespace SpacePhotos.Api.Dtos;

public class DayPhotoDto
{
    public string Copyright { get; set; } = null!;
    public DateTime Date { get; set; }
    public string Explanation { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Url { get; set; } = null!;
    [JsonProperty("hdurl")]
    public string HDUrl { get; set; } = null!;
    public string MediaType { get; set; } = null!;
    public string? VideoThumbnail { get; set; }
}
