using System.ComponentModel.DataAnnotations;

namespace EFDataAccess.Models
{
    public class Vehicle
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(10)]
        public int RegistrationNumber { get; set; }

        [Required]
        public VehicleType VehicleType { get; set; }
    }
}
