using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers 
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() 
        {
            //return await _context.Users.ToListAsync();

            return Ok(await _userRepository.GetUsers_Async());
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult<AppUser>> GetUser(int id) 
        //{
        //    //return await _context.Users.FindAsync(id);

        //    return Ok(await _userRepository.GetUserById_Async(id));
        //}

        [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>> GetUser(string username)
        {
            return await _userRepository.GetUserByName_Async(username);
        }
    }
}