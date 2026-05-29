using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagerWebAPI.DTOs;
using TaskManagerWebAPI.Services.Inerfaces;

namespace TaskManagerWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateTask(CreateTaskDTO dto)
        {
            return Ok(await _taskService.CreateTask(dto));
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            return Ok(await _taskService.GetAllTasks());
        }
        [Authorize]
        [HttpGet("mytasks")]
        public async Task<IActionResult> GetMyTasks()
        {
            var userId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            return Ok(await _taskService.GetMyTasks(userId));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(
            int id,
            UpdateTaskDTO dto)
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value ?? "";

            return Ok(await _taskService.UpdateTask(id, dto, role));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            return Ok(await _taskService.DeleteTask(id));
        }
    }
}
