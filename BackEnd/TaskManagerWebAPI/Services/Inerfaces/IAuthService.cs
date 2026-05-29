using TaskManagerEFCore.Models;
using TaskManagerWebAPI.DTOs;

namespace TaskManagerWebAPI.Services.Inerfaces
{
    public interface IAuthService
    {
        Task<LoginResponseDTO?> LoginAsync(LoginDTO loginDTO);

        Task<User> RegisterUserAsync(
            RegisterUserDTO registerDTO
        );
        Task<List<UserListDTO>> GetAllUsersAsync();
    }
}
