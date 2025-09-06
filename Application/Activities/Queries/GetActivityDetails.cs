using System;
using System.Security.Cryptography.X509Certificates;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Activity>
    {
        public required Guid Id { get; set; }
    }

    public class Handler(AppDbContext dbContext) : IRequestHandler<Query, Activity>
    {
        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FindAsync([request.Id], cancellationToken);
            if (activity == null)
            {
                throw new Exception("Activity Not Found.");
            }
            return activity;
        }
    }





}
