using TaskManagerEFCore.Models;
using TaskManagerWebAPI.DTOs;

namespace TaskManagerWebAPI.Services.Inerfaces
{
    public interface ITaskService
    {
        Task<TaskItem> CreateTask(CreateTaskDTO dto);

        Task<List<TaskResponseDTO>> GetAllTasks();

        Task<List<TaskResponseDTO>> GetMyTasks(int userId);

        Task<string> UpdateTask(int id, UpdateTaskDTO dto, string role);

        Task<string> DeleteTask(int id);
    }
}
