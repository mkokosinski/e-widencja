using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EFDataAccess.Models
{
    public class Permission
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        public List<User> Users { get; set; }
    }
}