namespace TaskManagerWebAPI.DTOs
{
    public class CreateTaskDTO
    {
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Priority { get; set; } = "Low";

        public DateTime DueDate { get; set; }

        public int AssignedToUserId { get; set; }
    }
}
