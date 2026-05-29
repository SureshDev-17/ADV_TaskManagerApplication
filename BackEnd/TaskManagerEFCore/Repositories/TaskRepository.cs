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
    public class TaskRepository : ITaskRepository
    {
        private readonly ApplicationDbContext _context;

        public TaskRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TaskItem> CreateTask(TaskItem task)
        {
            _context.Tasks.Add(task);

            await _context.SaveChangesAsync();

            return task;
        }

        public async Task<List<TaskItem>> GetAllTasks()
        {
            return await _context.Tasks
                .Include(t => t.AssignedToUser)
                .ToListAsync();
        }

        public async Task<List<TaskItem>> GetTasksByUserId(int userId)
        {
            return await _context.Tasks
                .Where(t => t.AssignedToUserId == userId)
                .ToListAsync();
        }

        public async Task<TaskItem?> GetTaskById(int id)
        {
            return await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task UpdateTask(TaskItem task)
        {
            _context.Tasks.Update(task);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteTask(TaskItem task)
        {
            _context.Tasks.Remove(task);

            await _context.SaveChangesAsync();
        }
    }
}
