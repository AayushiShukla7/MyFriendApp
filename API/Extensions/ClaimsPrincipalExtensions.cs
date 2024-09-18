using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUsername( this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;    // Claims Principal (Identity)
        }

        public static int GetUserId(this ClaimsPrincipal user)
        {
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);    // Claims Principal (Identity)
        }
    }
}
