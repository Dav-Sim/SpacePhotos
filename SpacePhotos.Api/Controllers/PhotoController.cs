using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
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
}
