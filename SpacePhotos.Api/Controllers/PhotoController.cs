using Microsoft.AspNetCore.Mvc;
using SpacePhotos.Api.Dtos;
using SpacePhotos.Api.Services;

namespace SpacePhotos.Api.Controllers;

[ApiController]
[Route("api/photo")]
public class PhotoController : ControllerBase
{
    private readonly PhotoService _photoService;
    public PhotoController(PhotoService photoService)
    {
        _photoService = photoService;
    }

    [HttpGet("apod")]
    public async Task<ActionResult<IEnumerable<PhotoOfTheDayDto>>> GetPhotoOfTheDay([FromQuery] DateTime? from, [FromQuery] DateTime? to)
    {
        var data = await _photoService.GetPhotoOfTheDayAsync(from, to);

        return Ok(data);
    }

    [HttpGet("epic")]
    public async Task<ActionResult<IEnumerable<EarthDto>>> GetEarthPhotos([FromQuery] DateTime? date)
    {
        var data = await _photoService.GetEarthPhotosAsync(date);

        return Ok(data);
    }
}
