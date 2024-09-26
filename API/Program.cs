using API.Data;
using API.Entities;
using API.Extensions;
using API.Middleware;
using API.SignalR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddApplicationServices(builder.Configuration); // Moved to Extension method

            builder.Services.AddIdentityServices(builder.Configuration);    // Moved to Extension method

            builder.Services.AddSignalR();      // Added for user active status identification

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Data Seeding
            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;
            try
            {
                var context = services.GetRequiredService<DataContext>();
                var userManager = services.GetRequiredService<UserManager<AppUser>>();
                var roleManager = services.GetRequiredService<RoleManager<AppRole>>();

                await context.Database.MigrateAsync();  // Migrates DB here** [No more ef database update needed, just restart application]
                await Seed.SeedUsers(userManager, roleManager);
            }
            catch (Exception ex) 
            { 
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occured during migration");
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                // app.UseDeveloperExceptionPage();
            }

            app.UseMiddleware<ExceptionMiddleware>();       // Custom Exception Middleware

            app.UseCors(options => 
                options.WithOrigins("https://localhost:4200")
                .AllowCredentials()     // For SignalR
                .AllowAnyMethod()
                .AllowAnyHeader());     

            app.UseHttpsRedirection();

            app.UseAuthentication();    // Has to be #1

            app.UseAuthorization(); // Has to be #2

            app.MapControllers();

            app.MapHub<PresenceHub>("hubs/presence");   // Needed for SignalR

            await app.RunAsync();
        }
    }
}
