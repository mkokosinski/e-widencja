using System.ComponentModel.DataAnnotations;

namespace EFDataAccess.Models
{
    public class Address
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string City { get; set; }

        [Required]
        [MaxLength(50)]
        public string Street { get; set; }

        [Required]
        [MaxLength(10)]
        public string PostCode { get; set; }

        [Required]
        [MaxLength(5)]
        public string HouseNumber { get; set; }

        [Required]
        [MaxLength(5)]
        public string FlatNumber { get; set; }
    }
}