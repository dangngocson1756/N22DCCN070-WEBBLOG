using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBlogAPI.Data;
using MyBlogAPI.Models;

namespace MyBlogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            var exists = await _context.Users.AnyAsync(u => u.Email == user.Email);
            if (exists) return BadRequest("Email đã tồn tại!");

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Đăng ký thành công!" });
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(User loginInfo)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.Email == loginInfo.Email && u.Password == loginInfo.Password);

            if (user == null) return Unauthorized("Email hoặc mật khẩu không đúng!");

            return Ok(new { 
                message = "Đăng nhập thành công!",
                userId = user.Id,
                name = user.Name,
                email = user.Email
            });
        }
    }
}