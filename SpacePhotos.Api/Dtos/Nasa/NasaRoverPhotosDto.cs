using Newtonsoft.Json;

namespace SpacePhotos.Api.Dtos.Nasa;

public class NasaRoverPhotosDto
{
    public List<NasaRoverPhotoDto> Photos { get; set; } = new();
}

public class NasaRoverPhotoDto
{
    public int Id { get; set; }
    public int Sol { get; set; }
    public NasaRoverCameraDto Camera { get; set; } = null!;
    [JsonProperty("img_src")]
    public string ImgSrc { get; set; } = null!;
    [JsonProperty("earth_date")]
    public DateTime EarthDate { get; set; }
    public NasaRoverInfoDto Rover { get; set; } = null!;
}

public class NasaRoverInfoDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    [JsonProperty("landing_date")]
    public DateTime LandingDate { get; set; }
    [JsonProperty("launch_date")]
    public DateTime LaunchDate { get; set; }
    public string Status { get; set; }
    [JsonProperty("max_sol")]
    public int MaxSol { get; set; }
    [JsonProperty("max_date")]
    public DateTime MaxDate { get; set; }
    [JsonProperty("total_photos")]
    public int TotalPhotos { get; set; }
}
public class NasaRoverCameraDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    [JsonProperty("rover_id")]
    public int RoverId { get; set; }
    [JsonProperty("full_name")]
    public string FullName { get; set; } = null!;
}