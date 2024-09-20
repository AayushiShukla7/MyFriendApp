﻿namespace API.Helpers
{
    public class UserParams : PaginationParams
    {
        // Filtering
        public string? CurrentUsername { get; set; }
        public string? Gender { get; set; }
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 100;

        // Sorting
        public string OrderBy { get; set; } = "lastActive";
    }
}
