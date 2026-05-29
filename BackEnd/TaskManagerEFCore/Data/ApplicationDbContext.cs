using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerEFCore.Models;

namespace TaskManagerEFCore.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options
        ) : base(options)
        {

        }

        // Tables
        public DbSet<User> Users { get; set; }

        public DbSet<TaskItem> Tasks { get; set; }

        protected override void OnModelCreating(
            ModelBuilder modelBuilder
        )
        {
            base.OnModelCreating(modelBuilder);

            // User Email Unique
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Relationship
            modelBuilder.Entity<TaskItem>()
                .HasOne(t => t.AssignedToUser)
                .WithMany()
                .HasForeignKey(t => t.AssignedToUserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
