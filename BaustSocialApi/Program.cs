using Application.Activities.Queries;
using Application.Activities.Validators;
using Application.Commands;
using Application.Core;
using BaustSocialApi.Middleware;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(opt =>
opt.UseSqlite(builder.Configuration.GetConnectionString("defaultConnection")));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddAutoMapper(x =>
{
    x.AddProfile<MappingProfiles>();
});
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
//MediatorR Services are Reg.
builder.Services.AddMediatR(x=> {
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    x.AddOpenBehavior(typeof(ValidationBehavior<,>));

});
builder.Services.AddMediatR(x => x.RegisterServicesFromAssemblyContaining<GetActivityDetails.Handler>());
builder.Services.AddMediatR(x => x.RegisterServicesFromAssemblyContaining<EditActivity.Handler>());
builder.Services.AddTransient<ExceptionMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(options => options.AllowAnyHeader().AllowAnyMethod()
            .WithOrigins("http://localhost:3000"));
app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);

}
catch (Exception ex)
{
    var logger = services.GetRequiredService<Logger<Program>>();
    logger.LogError(ex, "Something went worng in DbContext");
}

app.Run();