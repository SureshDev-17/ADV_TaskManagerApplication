using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerEFCore.Data;
using TaskManagerEFCore.Models;
using TaskManagerEFCore.Repositories.Interfaces;

namespace TaskManagerEFCore.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(
            ApplicationDbContext context
        )
        {
            _context = context;
        }

        // Get User By Email
        public async Task<User?> GetUserByEmailAsync(
            string email
        )
        {
            return await _context.Users
                .FirstOrDefaultAsync(
                    u => u.Email == email
                );
        }

        // Get User By Id
        public async Task<User?> GetUserByIdAsync(
            int id
        )
        {
            return await _context.Users
                .FindAsync(id);
        }

        // Get All Users
        public async Task<List<User>>
            GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }
       

        // Add User
        public async Task AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }

        // Save Changes
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
