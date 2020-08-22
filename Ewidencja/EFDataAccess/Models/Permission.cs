using System.Collections.Generic;

namespace EFDataAccess.Models
{
    public class Permission
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<User> Users { get; set; }
    }
}