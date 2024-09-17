using API.Helpers;
using System.Text.Json;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationheader(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationheader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            
            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationheader, options));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
