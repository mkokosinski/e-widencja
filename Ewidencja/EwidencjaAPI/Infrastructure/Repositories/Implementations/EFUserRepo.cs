using EFDataAccess;
using EFDataAccess.Models;
using EwidencjaAPI.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Infrastructure.Interfaces;

namespace WebAPI.Infrastructure.Repositories.Implementations
{
    public class EFUserRepo : IUserRepo
    {
        private readonly EwidencjaContext context;

        public EFUserRepo(EwidencjaContext context)
        {
            this.context = context;
        }

        public void CreateUser(User user)
        {
            context.User.Add(user);
        }

        public IEnumerable<User> GetAllUsers()
        {
            return context.User.ToList();
        }

        public User GetUserById(int id)
        {
            return context.User.Find(id);
        }

        public bool SaveChanges()
        {
            return (context.SaveChanges() >= 0);
        }

        public void UpdateUser(User user)
        {
            //Not needed 
        }
    }
}
