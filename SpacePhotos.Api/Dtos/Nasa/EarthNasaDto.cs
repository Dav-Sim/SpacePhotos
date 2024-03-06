using System.Text.Json.Serialization;

namespace SpacePhotos.Api.Dtos.Nasa;

public class EarthNasaDto
{
    public string Identifier { get; set; } = null!;
    public string Caption { get; set; } = null!;
    public string Image { get; set; } = null!;
    public string Version { get; set; } = null!;
    public string Date { get; set; } = null!;
    public EarthCoordsNasaDto Coords { get; set; } = null!;
}
public class EarthCentroidCoordinatesNasaDto
{
    public double Lat { get; set; }
    public double Lon { get; set; }
}

public class EarthCoordsNasaDto
{
    [JsonPropertyName("centroid_coordinates")]
    public EarthCentroidCoordinatesNasaDto CentroidCoordinates { get; set; } = null!;
}

