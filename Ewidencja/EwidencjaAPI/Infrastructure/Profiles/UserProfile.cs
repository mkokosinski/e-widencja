using AutoMapper;
using EFDataAccess.Models;
using EwidencjaAPI.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EwidencjaAPI.Infrastructure.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            // source to target
            CreateMap<User, UserReadDTO>();
            CreateMap<UserCreateDTO, User>();
            CreateMap<User, UserUpdateDTO>();
            CreateMap<UserUpdateDTO, User>();
        }
    }
}
