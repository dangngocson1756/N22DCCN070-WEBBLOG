using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBlogAPI.Data;
using MyBlogAPI.Models;

namespace MyBlogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetAll()
        {
            return await _context.Posts.ToListAsync();
        }

        // GET: api/posts/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetById(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null) return NotFound();
            return post;
        }

        // POST: api/posts
        [HttpPost]
        public async Task<ActionResult<Post>> Create(Post post)
        {
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
        }

        // PUT: api/posts/1
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Post post)
        {
            if (id != post.Id) return BadRequest();
            _context.Entry(post).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/posts/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null) return NotFound();
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}