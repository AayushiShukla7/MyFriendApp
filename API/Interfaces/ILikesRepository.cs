using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int likedUserId);
        Task<AppUser> GetUserWithLiked(int userId);
        Task<IEnumerable<LikeDto>> GetUserLiked(string predicate, int userid);
    }
}
