using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;

        public LikesRepository(DataContext context)
        {
            _context = context;
        }

        public Task<UserLike> GetUserLike(int sourceUserId, int likedUserId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<LikeDto>> GetUserLiked(string predicate, int userid)
        {
            throw new NotImplementedException();
        }

        public Task<AppUser> GetUserWithLiked(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
