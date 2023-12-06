namespace F1API.Controllers;

using Microsoft.AspNetCore.Mvc;
using F1API.Contexts;
using F1API.Models;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]

public class DriversController : ControllerBase
{
    private readonly F1Context context;

    public DriversController(F1Context _context)
    {
        context = _context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Driver>>> Get()
    {
        try 
        {
            List<Driver> drivers = await context.Drivers.ToListAsync();
            if (drivers != null)
            {
                return Ok(drivers);
            }
            else 
            {
                return NotFound();
            }
        }
        catch
        {
            return StatusCode(500); 
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Driver>> Get (int id)
    {
        try 
        {
            Driver? driver = await context.Drivers.FindAsync(id);
            if (driver != null) 
            {  
            return Ok(driver);
            } 
            else
            {
                return NotFound();
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpGet("[action]/{name}")]
    public async Task<ActionResult<Driver>> Get (string name)
    {
        try {
            if (name == null) {
                return BadRequest("Name can not be null");
            }

            Driver? driver = await context.Drivers.SingleOrDefaultAsync(driver => driver.Name != null && driver.Name.ToLower() == name.ToLower());
            if (driver != null) 
            {
            return Ok(driver);
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(500);
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id) 
    {
        try {
        Driver? driver = await context.Drivers.FindAsync(id);
        if (driver != null)
            {
                context.Drivers.Remove(driver);
                await context.SaveChangesAsync();
                return NoContent();
            }
            else 
            {
                return NotFound();
            }
        }
        catch 
        {
            return StatusCode(500);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Put(Driver editedDriver)
    {
        try 
        {
            context.Entry(editedDriver).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return NoContent();
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post (Driver newDriver)
    {
        try {
            context.Drivers.Add(newDriver);
            await context.SaveChangesAsync();
            return Ok();
        }
        catch
        {
            return StatusCode(500);
        }
    }

}