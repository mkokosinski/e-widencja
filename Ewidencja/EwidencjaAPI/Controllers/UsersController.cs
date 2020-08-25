using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EFDataAccess;
using EFDataAccess.Models;
using EwidencjaAPI.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Infrastructure.Interfaces;

namespace EwidencjaAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepo repository;
        private readonly IMapper mapper;

        public UsersController(IUserRepo repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        //GET api/Users
        [HttpGet]
        public ActionResult<IEnumerable<UserReadDTO>> GetAllUsers()
        {
            var usersList = repository.GetAllUsers();

            if (usersList != null)
            {
                return Ok(mapper.Map<IEnumerable<UserReadDTO>>(usersList));
            }
            return NotFound();
        }

        //GET api/Users/{id}
        [HttpGet("{id}", Name= "GetUserById")]
        public ActionResult<UserReadDTO> GetUserById(int id)
        {
            var user = repository.GetUserById(id);

            if (user != null)
            {
                return Ok(mapper.Map<UserReadDTO>(user));
            }
            return NotFound();
        }

        //POST api/Users
        [HttpPost]
        public ActionResult<UserReadDTO> CreateUser(UserCreateDTO userCreateDTO)
        {
            User userModel = mapper.Map<User>(userCreateDTO);
            repository.CreateUser(userModel);
            repository.SaveChanges();

            UserReadDTO userRead = mapper.Map<UserReadDTO>(userModel);

            return CreatedAtRoute(nameof(GetUserById), new { Id = userRead.Id }, userRead);

        }

        //PUT api/Users/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateUser(int id, UserUpdateDTO userUpdateDTO)
        {
            var userModelFromRepo = repository.GetUserById(id);
            if (userModelFromRepo == null)
            {
                return NotFound();
            }

            mapper.Map(userUpdateDTO, userModelFromRepo);

            repository.UpdateUser(userModelFromRepo);
            repository.SaveChanges();

            return NoContent();
        }
    }
}
