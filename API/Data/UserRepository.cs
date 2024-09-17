using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #region Projection

        public async Task<PagedList<MemberDto>> GetMembers_Async(UserParams userParams)
        {
            var query = _context.Users
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .AsNoTracking();

            return await PagedList<MemberDto>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<MemberDto> GetMember_Async(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        #endregion Projection

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
