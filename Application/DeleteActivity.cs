using System;
using MediatR;
using Persistence;

namespace Application;

public class DeleteActivity
{
    public class Command : IRequest
    {
        public required Guid Id { get; set; }
    }

    public class Handler(AppDbContext dbContext) : IRequestHandler<Command>
    {
        private readonly AppDbContext dbContext = dbContext;

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FindAsync([request.Id], cancellationToken)
                 ?? throw new Exception("Activity Not Found.");
            dbContext.Activities.Remove(activity);
            await dbContext.SaveChangesAsync(cancellationToken);           
        }
    }

}
