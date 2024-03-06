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
    public async Task<ActionResult<PhotoOfTheDayDto>> GetPhotoOfTheDay()
    {
        var data = await _photoService.GetPhotoOfTheDayAsync();

        return Ok(data);
    }

    [HttpGet("epic")]
    public async Task<ActionResult<IEnumerable<EarthDto>>> GetEarthPhotos()
    {
        var data = await _photoService.GetEarthPhotosAsync();

        return Ok(data);
    }
}
