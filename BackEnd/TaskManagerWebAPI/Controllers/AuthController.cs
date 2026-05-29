using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagerWebAPI.DTOs;
using TaskManagerWebAPI.Services.Inerfaces;

namespace TaskManagerWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(
            IAuthService authService
        )
        {
            _authService = authService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("getUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var users =
                await _authService
                    .GetAllUsersAsync();

            return Ok(users);
        }
        // ADMIN / USER LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login(
            LoginDTO loginDTO
        )
        {
            var token =
                await _authService.LoginAsync(
                    loginDTO
                );

            if (token == null)
            {
                return Unauthorized(
                    new
                    {
                        message =
                            "Invalid Email or Password"
                    }
                );
            }

            return Ok(
                new
                {
                    token = token
                }
            );
        }

        // CREATE USER
        [Authorize(Roles = "Admin")]
        [HttpPost("register")]
        public async Task<IActionResult> Register(
            RegisterUserDTO registerDTO
        )
        {
            var createdUser =
                await _authService
                    .RegisterUserAsync(
                        registerDTO
                    );

            return Ok(
                new
                {
                    message =
                        "User Created Successfully",

                    user = createdUser
                }
            );
        }
    }
}
