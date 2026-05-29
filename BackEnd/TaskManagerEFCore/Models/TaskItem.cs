using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagerEFCore.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Priority { get; set; } = "Low";

        public string Status { get; set; } = "Pending";

        public DateTime DueDate { get; set; }

        // User can update only one time
        public bool IsUpdated { get; set; } = false;

        // Foreign Key
        public int AssignedToUserId { get; set; }

        // Navigation Property
        public User? AssignedToUser { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
