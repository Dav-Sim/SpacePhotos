namespace SpacePhotos.Api.Dtos
{
    public class RoverCameraDto : IEquatable<RoverCameraDto>
    {
        public string Key { get; set; } = null!;
        public string Name { get; set; } = null!;

        public bool Equals(RoverCameraDto? other)
        {
            return Key == other?.Key && Name == other?.Name;
        }
    }
}
