namespace SpacePhotos.Api.Dtos;

public class RoverPhotoDto
{
    public int Id { get; set; }
    public int Sol { get; set; }
    public string Url { get; set; } = null!;
    public DateTime EarthDate { get; set; }

    public int RoverId { get; set; }
    public string RoverName { get; set; }
    public DateTime RoverLandingDate { get; set; }
    public DateTime RoverLaunchDate { get; set; }
    public string RoverStatus { get; set; }
    public int RoverMaxSol { get; set; }
    public DateTime RoverMaxDate { get; set; }
    public int RoverTotalPhotos { get; set; }

    public int CameraId { get; set; }
    public string CameraName { get; set; } = null!;
    public string CameraFullName { get; set; } = null!;
}
