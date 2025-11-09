using System;
using Application.Activities.Dtos;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Commands;

public class CreateActivity
{
    public class Command : IRequest<Guid>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }
    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Command, Guid>
    {
        public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = mapper.Map<Activity>(request.ActivityDto);
            dbContext.Activities.Add(activity);
            await dbContext.SaveChangesAsync(cancellationToken);
            return activity.Id;
        }
    }
}
