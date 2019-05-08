using Lab6.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Lab6.Middlewares
{
    //You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class DbInitMiddleware
    {
        private readonly RequestDelegate _next;

        public DbInitMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public Task Invoke(HttpContext httpContext, CinemaContext dbContext)
        {
            DbInitializer.Initialize(dbContext);

            return _next(httpContext);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class DbInitMiddlewareExtensions
    {
        public static IApplicationBuilder UseDbInitMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<DbInitMiddleware>();
        }
    }
}