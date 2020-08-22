using System;
using System.ComponentModel.DataAnnotations;

namespace EFDataAccess.Models
{
    public class Route
    {

        [Required]
        public int Id { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string Start { get; set; }

        [Required]
        [MaxLength(50)]
        public string Finish { get; set; }

        [Required]
        [Range(0, 100000)]
        public double Length { get; set; }

        [Required]
        [MaxLength(50)]
        public string Purpose { get; set; }

        [MaxLength(50)]
        public Route IsContinuation { get; set; } = null!;

        [MaxLength(250)]
        public string Comment { get; set; }
    }
}
