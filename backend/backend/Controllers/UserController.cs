using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private static readonly List<User> _users = new()
    {
        new User { Id = 1, Name = "Jhon Doe" },
        new User { Id = 2, Name = "Jane Doe" }
    };

    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok(_users);
    }

    [HttpGet("{id}")]
    public IActionResult GetUser(int id)
    {
        if (id < 0)
        {
            return BadRequest(new { Message = "Invalid user ID. ID must be greather than zero" });
        }

        var user = _users.FirstOrDefault(u => u.Id == id);
        if (user == null)
        {
            return NotFound(new { Message = "User not found", UserId = id});
        }

        return Ok(user);
    }
}