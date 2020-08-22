using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace EFDataAccess.Models
{
    class Company
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(10)]
        public string NIP { get; set; }

        [Required]
        [MaxLength(14)]
        public string REGON { get; set; }
        public List<Address> Address { get; set; }
    }
}
