using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<AppUser> GetUserById_Async(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByName_Async(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)     // Eager loading
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsers_Async()
        {
            return await _context.Users
                .Include(p => p.Photos)     // Eager loading
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;       // '> 0' check => Execute only if there are changes to make (**more than 0 rows affected)
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;  // Adds a flag to the entity that it has been modified
        }
    }
}
