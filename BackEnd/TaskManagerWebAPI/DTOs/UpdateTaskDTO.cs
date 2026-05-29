namespace TaskManagerWebAPI.DTOs
{
    public class UpdateTaskDTO
    {
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Priority { get; set; } = "Low";

        public string Status { get; set; } = "Pending";

        public DateTime DueDate { get; set; }
    }
}
