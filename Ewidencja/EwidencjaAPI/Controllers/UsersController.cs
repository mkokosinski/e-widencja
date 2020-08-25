using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EFDataAccess;
using EFDataAccess.Models;
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

        public UsersController(IUserRepo repository)
        {
            this.repository = repository;
        }
        public ActionResult<IEnumerable<User>> GetAllUsers()
        {
            var usersList = repository.GetAllUsers();

            return Ok(usersList);
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetUserById(int id)
        {
            var user = repository.GetUserById(id);

            return Ok(user);
        }
    }
}
