﻿using EFDataAccess.Models;
using EwidencjaAPI.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Infrastructure.Interfaces
{
    public interface IUserRepo
    {
        public IEnumerable<User> GetAllUsers();
        public User GetUserById(int id);
        public void CreateUser(User user);
        public void UpdateUser(User user);
        public void DeleteUser(User user);
        bool SaveChanges();
    }
}
