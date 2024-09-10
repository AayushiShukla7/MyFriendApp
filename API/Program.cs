using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            //builder.Services.AddDbContext<DataContext>(options =>
            //{
            //    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
            //});

            //builder.Services.AddScoped<ITokenService, TokenService>();

            builder.Services.AddApplicationServices(builder.Configuration); // Moved to Extension method

            // Authentication Middleware
            //builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //    .AddJwtBearer(options =>
            //    {
            //        options.TokenValidationParameters = new TokenValidationParameters
            //        {
            //            ValidateIssuerSigningKey = true,
            //            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
            //            ValidateIssuer = false,
            //            ValidateAudience = false
            //        };
            //    });

            builder.Services.AddIdentityServices(builder.Configuration);    // Moved to Extension method

            builder.Services.AddScoped<IUserRepository, UserRepository>();  // Repository Pattern

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
                await context.Database.MigrateAsync();  // Migrates DB here** [No more ef database update needed, just restart application]
                await Seed.SeedUsers(context);
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
                options.WithOrigins("http://localhost:4200", "https://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader());     

            app.UseHttpsRedirection();

            app.UseAuthentication();    // Has to be #1

            app.UseAuthorization(); // Has to be #2

            app.MapControllers();

            await app.RunAsync();
        }
    }
}
