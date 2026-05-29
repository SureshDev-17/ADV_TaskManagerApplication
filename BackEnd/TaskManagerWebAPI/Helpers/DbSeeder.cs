using TaskManagerEFCore.Data;
using TaskManagerEFCore.Models;

namespace TaskManagerWebAPI.Helpers
{
    public class DbSeeder
    {
        public static async Task SeedAdminAsync(
            ApplicationDbContext context
        )
        {
            // Check Admin Exists
            if (!context.Users.Any(
                u => u.Role == "Admin"
            ))
            {
                var adminUser = new User
                {
                    Name = "Admin",

                    Email = "admin@gmail.com",

                    PasswordHash =
                        BCrypt.Net.BCrypt.HashPassword(
                            "admin123"
                        ),

                    Department = "Management",

                    Role = "Admin"
                };

                context.Users.Add(adminUser);

                await context.SaveChangesAsync();
            }
        }
    }
}
