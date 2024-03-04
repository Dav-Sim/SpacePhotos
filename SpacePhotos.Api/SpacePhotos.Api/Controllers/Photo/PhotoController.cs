using Microsoft.AspNetCore.Mvc;
using SpacePhotos.Api.Controllers.Photo.Dtos;

namespace SpacePhotos.Api.Controllers.Photos;

[ApiController]
[Route("api/photo")]
public class PhotoController : ControllerBase
{
    public PhotoController()
    {
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PhotoDto>>> GetPhotos()
    {
        var photos = new List<PhotoDto>()
        {
            new PhotoDto() { Id=0, Url="https://picsum.photos/200" },
            new PhotoDto() { Id=1, Url="https://picsum.photos/200" },
            new PhotoDto() { Id=2, Url="https://picsum.photos/200" },
        };

        return Ok(photos);
    }
}
