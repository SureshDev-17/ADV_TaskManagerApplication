using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerEFCore.Models;

namespace TaskManagerEFCore.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmailAsync(string email);

        Task<User?> GetUserByIdAsync(int id);

        Task<List<User>> GetAllUsersAsync();

        Task AddUserAsync(User user);

        Task SaveChangesAsync();


    }
}
