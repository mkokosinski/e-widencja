using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EFDataAccess.Models
{
    public class User
    {
        [Required]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(30)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(30)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public List<Permission> Permissions { get; set; }
    }
}