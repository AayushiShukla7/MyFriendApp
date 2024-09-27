using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<IEnumerable<AppUser>> GetUsers_Async();
        Task<AppUser> GetUserById_Async(int id);
        Task<AppUser> GetUserByName_Async(string username);
        Task<PagedList<MemberDto>> GetMembers_Async(UserParams userParams);
        Task<MemberDto> GetMember_Async(string username);
        Task<string> GetUserGender(string username);
    }
}
