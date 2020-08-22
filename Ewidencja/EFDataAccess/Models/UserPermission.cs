using System.ComponentModel.DataAnnotations;

namespace EFDataAccess.Models
{
    public class UserPermission
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public User User { get; set; }
        [Required]
        public int PermissionId { get; set; }
        [Required]
        public Permission Permission { get; set; }
    }
}
