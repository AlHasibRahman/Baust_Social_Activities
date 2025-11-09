using Domain;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Commands;
using Application;
using Application.Activities.Dtos;

namespace BaustSocialApi
{
    public class ActivitiesController() : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetAllActivities()
        {
            return await Mediator.Send(new GetActivityList.Query());
        }
        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<Activity>> GetActivitiesById([FromRoute] Guid id)
        {
            return await Mediator.Send(new GetActivityDetails.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateActivity([FromBody] CreateActivityDto activityDto)
        {
            return await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto });
        }

        [HttpPut]
        public async Task<ActionResult> EditActivity([FromBody] Activity activity)
        {
            await Mediator.Send(new EditActivity.Command { Activity = activity });
            return NoContent();
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult> DeleteActivity([FromRoute] Guid id)
        {
            await Mediator.Send(new DeleteActivity.Command { Id = id });
            return Ok();
        }
    }
}
