using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Command>
    {
        private readonly AppDbContext dbContext = dbContext;
        private readonly IMapper mapper = mapper;

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FindAsync([request.Activity.Id], cancellationToken)
                ?? throw new Exception("Activity Not Found.");
            //Update the Activity
            mapper.Map(request.Activity, activity);
            await dbContext.SaveChangesAsync(cancellationToken);

        }
    }
}
