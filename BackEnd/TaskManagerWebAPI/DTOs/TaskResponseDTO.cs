namespace TaskManagerWebAPI.DTOs
{
    public class TaskResponseDTO
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Priority { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;

        public DateTime DueDate { get; set; }

        public bool IsUpdated { get; set; }

        public int AssignedToUserId { get; set; }

        public string AssignedToUser { get; set; } = string.Empty;
    }
}
