using EFDataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace EFDataAccess
{
    public class EFMainContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Host=localhost;Database=test_code_first;Username=test;Password=test");

        public DbSet<Address> Address { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<Cost> Cost { get; set; }
        public DbSet<CostType> CostType { get; set; }
        public DbSet<Permission> Permission { get; set; }
        public DbSet<Ride> Ride { get; set; }
        public DbSet<Route> Route { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Vehicle> Vehicle { get; set; }
        public DbSet<VehicleType> VehicleType { get; set; }

    }
}
