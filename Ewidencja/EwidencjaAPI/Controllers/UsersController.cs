using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EFDataAccess;
using EFDataAccess.Models;
using EwidencjaAPI.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
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


        //PATCH api/Users/{id}
        [HttpPatch("{id}")]
        public ActionResult PartialUpdateUser(int id, JsonPatchDocument<UserUpdateDTO> patchDoc)
        {
            var userModelFromRepo = repository.GetUserById(id);
            if (userModelFromRepo == null)
            {
                return NotFound();
            }

            var userToPatch = mapper.Map<UserUpdateDTO>(userModelFromRepo);
            patchDoc.ApplyTo(userToPatch, ModelState);

            if (!TryValidateModel(userToPatch))
            {
                return ValidationProblem(ModelState);
            }

            mapper.Map(userToPatch, userModelFromRepo);
            repository.UpdateUser(userModelFromRepo);
            repository.SaveChanges();

            return NoContent();
        }

        //DELETE api/Users/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteUser(int id)
        {
            var userModelFromRepo = repository.GetUserById(id);
            if (userModelFromRepo == null)
            {
                return NotFound();
            }
            repository.DeleteUser(userModelFromRepo);
            repository.SaveChanges();

            return NoContent();
        }


    }
}
