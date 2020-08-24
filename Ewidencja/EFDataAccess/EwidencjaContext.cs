﻿using EFDataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace EFDataAccess
{
    public class EwidencjaContext : DbContext
    {
        public EwidencjaContext(DbContextOptions<EwidencjaContext> opt) : base(opt)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserPermission>()
                .HasKey(t => new {t.Id});

            modelBuilder.Entity<UserPermission>()
                .HasOne(up => up.User)
                .WithMany(u => u.UserPermissions)
                .HasForeignKey(up => up.UserId);

            modelBuilder.Entity<UserPermission>()
                .HasOne(up => up.Permission)
                .WithMany(p => p.UserPermissions)
                .HasForeignKey(up => up.PermissionId);
        }
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
