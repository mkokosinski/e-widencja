using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EwidencjaAPI.DTOs
{
    public class UserReadDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        //public List<UserPermission> UserPermissions { get; set; }
    }
}
