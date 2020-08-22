using System.ComponentModel.DataAnnotations;

namespace EFDataAccess.Models
{
    public class CostType
    {
        [Required]
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsDefault { get; set; }
    }
}