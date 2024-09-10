using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsers_Async();
        Task<AppUser> GetUserById_Async(int id);
        Task<AppUser> GetUserByName_Async(string username);
        Task<IEnumerable<MemberDto>> GetMembers_Async();
        Task<MemberDto> GetMember_Async(string username);
    }
}
