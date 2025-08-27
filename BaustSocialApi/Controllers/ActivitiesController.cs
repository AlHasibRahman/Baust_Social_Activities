using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace BaustSocialApi
{
    public class ActivitiesController(AppDbContext context) : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllActivities()
        {
            return Ok(await context.Activities.ToListAsync());
        }
        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> GetActivitiesById([FromRoute] Guid id)
        {
            var exitActivitie = await context.Activities.FirstOrDefaultAsync(c => c.Id == id);
            if (exitActivitie == null)
            {
                return NotFound();
            }
            return Ok(exitActivitie);
        } 
    }
}
