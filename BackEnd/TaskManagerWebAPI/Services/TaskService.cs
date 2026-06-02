using TaskManagerEFCore.Models;
using TaskManagerEFCore.Repositories.Interfaces;
using TaskManagerWebAPI.DTOs;
using TaskManagerWebAPI.Services.Inerfaces;

namespace TaskManagerWebAPI.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository) 
        {
            _taskRepository = taskRepository;
        }
        public async Task<TaskItem> CreateTask(CreateTaskDTO dto)
        {
            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                Priority = dto.Priority,
                DueDate = dto.DueDate,
                AssignedToUserId = dto.AssignedToUserId,
            };
            return await _taskRepository.CreateTask(task); 
        }

        public async Task<List<TaskResponseDTO>> GetAllTasks()
        {
            var tasks = await _taskRepository.GetAllTasks();

            return tasks.Select(t => new TaskResponseDTO
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                Priority = t.Priority,
                Status = t.Status,
                DueDate = t.DueDate,
                IsUpdated = t.IsUpdated,
                AssignedToUserId = t.AssignedToUserId,
                AssignedToUser = t.AssignedToUser?.Name ?? ""
            }).ToList();
        }

        public async Task<List<TaskResponseDTO>> GetMyTasks(int userId)
        {
            var tasks =
                await _taskRepository.GetTasksByUserId(userId);

            return tasks.Select(t => new TaskResponseDTO
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                Priority = t.Priority,
                Status = t.Status,
                DueDate = t.DueDate,
                IsUpdated = t.IsUpdated,
                AssignedToUserId = t.AssignedToUserId,
                AssignedToUser = t.AssignedToUser?.Name ?? ""
            }).ToList();
        }

        public async Task<string> UpdateTask(int id, UpdateTaskDTO dto, string role)
        {
            var task = await _taskRepository.GetTaskById(id);

            if (task == null)
                return "Task not found";

            if (role == "User" && task.IsUpdated)
                return "You already updated this task";

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.Priority = dto.Priority;
            task.Status = dto.Status;
            task.DueDate = dto.DueDate;

            if (role == "User")
            {
                task.IsUpdated = true;
            }

            await _taskRepository.UpdateTask(task);

            return "Task updated";
        }
        public async Task<string> DeleteTask(int id)
        {
            var task = await _taskRepository.GetTaskById(id);

            if (task == null)
                return "Task not found";

            await _taskRepository.DeleteTask(task);

            return "Task deleted";
        }
    }
}
