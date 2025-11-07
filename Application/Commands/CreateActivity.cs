using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Commands;

public class CreateActivity
{
    public class Command : IRequest<Guid>
    {
        public required Activity Activity { get; set; }
    }
    public class Handler(AppDbContext dbContext) : IRequestHandler<Command, Guid>
    {
        private readonly AppDbContext dbContext = dbContext;

        public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
        {
            dbContext.Activities.Add(request.Activity);
            await dbContext.SaveChangesAsync(cancellationToken);
            return request.Activity.Id;
        }
    }
}
