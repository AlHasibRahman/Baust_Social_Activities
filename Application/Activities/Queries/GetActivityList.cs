using System;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<List<Activity>> { }

    public class Handler(AppDbContext dbContext) : IRequestHandler<Query, List<Activity>>
    {
        private readonly AppDbContext _dbContext = dbContext;

        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _dbContext.Activities.ToListAsync(cancellationToken);
        }
    }
}
