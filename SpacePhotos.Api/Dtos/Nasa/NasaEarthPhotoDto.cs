using Newtonsoft.Json;

namespace SpacePhotos.Api.Dtos.Nasa;

public class NasaEarthPhotoDto
{
    public string Identifier { get; set; } = null!;
    public string Caption { get; set; } = null!;
    public string Image { get; set; } = null!;
    public string Version { get; set; } = null!;
    public string Date { get; set; } = null!;
    public NasaEarthCoordsDto Coords { get; set; } = null!;
}
public class NasaEarthCentroidCoordsDto
{
    public double Lat { get; set; }
    public double Lon { get; set; }
}

public class NasaEarthCoordsDto
{
    [JsonProperty("centroid_coordinates")]
    public NasaEarthCentroidCoordsDto CentroidCoordinates { get; set; } = null!;
}

