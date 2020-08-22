using System.ComponentModel.DataAnnotations;

namespace EFDataAccess.Models
{
    public class VehicleType
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}