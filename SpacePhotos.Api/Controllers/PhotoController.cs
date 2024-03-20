using Microsoft.AspNetCore.Mvc;
using SpacePhotos.Api.Dtos;
using SpacePhotos.Api.Services;

namespace SpacePhotos.Api.Controllers;

[ApiController]
[Route("api/photo")]
public class PhotoController : ControllerBase
{
    private readonly IPhotoService _photoService;
    public PhotoController(IPhotoService photoService)
    {
        _photoService = photoService;
    }

    [HttpGet("apod")]
    public async Task<ActionResult<IEnumerable<DayPhotoDto>>> GetPhotoOfTheDay([FromQuery] DateTime? from, [FromQuery] DateTime? to)
    {
        var data = await _photoService.GetPhotoOfTheDayAsync(from, to);

        return Ok(data);
    }

    [HttpGet("epic")]
    public async Task<ActionResult<IEnumerable<EarthPhotoDto>>> GetEarthPhotos([FromQuery] DateTime? date)
    {
        var data = await _photoService.GetEarthPhotosAsync(date);

        return Ok(data);
    }

    [HttpGet("mars/perseverance/{camera}")]
    public async Task<ActionResult<IEnumerable<RoverPhotoDto>>> GetPerseverancePhotos([FromRoute] string camera, [FromQuery] DateTime? date)
    {
        if (!_photoService.IsCameraNameValid(camera))
        {
            return ValidationProblem($"Camera name '{camera}' is not valid");
        }

        var data = await _photoService.GetPerseverancePhotosAsync(camera, date);

        return Ok(data);
    }

    [HttpGet("mars/perseverance")]
    public async Task<ActionResult<IEnumerable<RoverCameraDto>>> GetPerseveranceCameras()
    {
        var data = _photoService.GetPerseveranceCameras();

        return Ok(data);
    }

}
