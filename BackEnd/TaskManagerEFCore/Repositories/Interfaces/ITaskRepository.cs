using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerEFCore.Models;

namespace TaskManagerEFCore.Repositories.Interfaces
{
    public interface ITaskRepository
    {
        Task<TaskItem> CreateTask(TaskItem task);

        Task<List<TaskItem>> GetAllTasks();

        Task<List<TaskItem>> GetTasksByUserId(int userId);

        Task<TaskItem?> GetTaskById(int id);

        Task UpdateTask(TaskItem task);

        Task DeleteTask(TaskItem task);
    }
}
