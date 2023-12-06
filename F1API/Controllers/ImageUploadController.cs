namespace F1API.Controllers;


using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]

public class ImageUploadController : ControllerBase
{
    private readonly IWebHostEnvironment environment;
    public ImageUploadController(IWebHostEnvironment _environement)
    {
        environment = _environement;
    }

    [HttpPost]
    public IActionResult PostImage(IFormFile formFile)
    {
        try 
        {

            if (formFile == null) {
                return BadRequest("ugyldig fil");
            }

            string webRootPath = environment.WebRootPath;
            string absolutePath = Path.Combine($"{webRootPath}/images/drivers/{formFile.FileName}");

            using(var fileStream = new FileStream(absolutePath, FileMode.Create))
            {
                formFile.CopyTo(fileStream);
            }

            return Ok();
        }
        catch 
        {
            return StatusCode(500);
        }

    }
}