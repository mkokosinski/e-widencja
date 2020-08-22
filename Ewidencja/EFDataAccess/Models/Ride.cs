using System;
using System.ComponentModel.DataAnnotations;

namespace EFDataAccess.Models
{
    class Ride
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public Route Route { get; set; }

        [Required]
        public Vehicle Vehicle { get; set; }

        [Required]
        public User Driver { get; set; }

        [Required]
        public User AddedBy { get; set; }

        [Required]
        public DateTime RideDate { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }


    }
}
