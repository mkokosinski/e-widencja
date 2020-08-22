﻿using System;
using System.ComponentModel.DataAnnotations;

namespace EFDataAccess.Models
{
    class Cost
    {
        [Required]
        public int Id { get; set; }
        public CostType CostType { get; set; }

        [MaxLength(50)]
        public string DocumentNumber { get; set; }

        [Required]
        [Range(0, 1000000)]
        public double Value { get; set; }
    }
}
