using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using API.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();  // Token Generation Service
            services.AddScoped<IPhotoService, PhotoService>();  // Photo Upload Service
            services.AddScoped<LogUserActivity>();  // To update the LastActive on successful Login
            services.AddScoped<ILikesRepository, LikesRepository>();    // Likes
            services.AddScoped<IMessageRepository, MessageRepository>();    // Messages

            services.AddSingleton<PresenceTracker>();   // Presence Tracker - SignalR

            services.AddScoped<IUserRepository, UserRepository>();  // Repository Pattern
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);    // Automapper Injection

            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));    // Image Upload API

            return services;
        }
    }
}
