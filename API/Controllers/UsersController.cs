using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers 
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;

        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers() 
        {
            //return await _context.Users.ToListAsync();

            //var users = await _userRepository.GetUsers_Async();
            //var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users); 

            // After Projection
            var usersToReturn = await _userRepository.GetMembers_Async();

            return Ok(usersToReturn);
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult<AppUser>> GetUser(int id) 
        //{
        //    //return await _context.Users.FindAsync(id);

        //    return Ok(await _userRepository.GetUserById_Async(id));
        //}

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            //var userByName = await _userRepository.GetUserByName_Async(username);
            //var userToReturn = _mapper.Map<MemberDto>(userByName);

            // After Projection
            var userToReturn = await _userRepository.GetMember_Async(username);          

            return userToReturn;
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;    // Claims Identity
            var user = await _userRepository.GetUserByName_Async(username);

            _mapper.Map(memberUpdateDto, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }
    }
}