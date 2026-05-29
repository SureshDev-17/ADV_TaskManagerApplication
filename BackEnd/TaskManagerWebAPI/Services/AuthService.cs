using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagerEFCore.Models;
using TaskManagerEFCore.Repositories;
using TaskManagerWebAPI.DTOs;
using TaskManagerWebAPI.Services.Inerfaces;
using TaskManagerEFCore.Repositories.Interfaces;

namespace TaskManagerWebAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;

        private readonly IConfiguration _configuration;

        public AuthService(
            IUserRepository userRepository,
            IConfiguration configuration
        )
        {
            _userRepository = userRepository;

            _configuration = configuration;
        }

        // LOGIN
        public async Task<LoginResponseDTO?> LoginAsync(
            LoginDTO loginDTO
        )
        {
            var user =
                await _userRepository
                    .GetUserByEmailAsync(
                        loginDTO.Email
                    );

            if (user == null)
            {
                return null;
            }

            // Verify Password
            bool isPasswordValid =
                BCrypt.Net.BCrypt.Verify(
                    loginDTO.Password,
                    user.PasswordHash
                );

            if (!isPasswordValid)
            {
                return null;
            }

            // Generate JWT
            return GenerateJwtToken(user);
        }

        // REGISTER USER
        public async Task<User> RegisterUserAsync(
            RegisterUserDTO registerDTO
        )
        {
            // Hash Password
            string passwordHash =
                BCrypt.Net.BCrypt.HashPassword(
                    registerDTO.Password
                );

            var user = new User
            {
                Name = registerDTO.Name,

                Email = registerDTO.Email,

                PasswordHash = passwordHash,

                Department = registerDTO.Department,

                Role = "User"
            };

            await _userRepository.AddUserAsync(user);

            await _userRepository.SaveChangesAsync();

            return user;
        }

        // GENERATE JWT TOKEN
        private LoginResponseDTO GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(
                    ClaimTypes.NameIdentifier,
                    user.Id.ToString()
                ),

                new Claim(
                    ClaimTypes.Name,
                    user.Name
                ),

                new Claim(
                    ClaimTypes.Email,
                    user.Email
                ),

                new Claim(
                    ClaimTypes.Role,
                    user.Role
                )
            };

            var key =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        _configuration["Jwt:Key"]!
                    )
                );

            var creds =
                new SigningCredentials(
                    key,
                    SecurityAlgorithms.HmacSha256
                );

            var token =
                new JwtSecurityToken(
                    issuer:
                        _configuration["Jwt:Issuer"],

                    audience:
                        _configuration["Jwt:Audience"],

                    claims: claims,

                    expires:
                        DateTime.Now.AddHours(1),

                    signingCredentials: creds
                );

            var jwtToken =  new JwtSecurityTokenHandler()
                .WriteToken(token);
            return new LoginResponseDTO
            {
                Token = jwtToken,

                Name = user.Name,

                Email = user.Email,

                Role = user.Role
            };
        }
        public async Task<List<UserListDTO>> GetAllUsersAsync()
        {
            var users =
                await _userRepository.GetAllUsersAsync();

            return users.Select(x => new UserListDTO
            {
                Id = x.Id,
                Name = x.Name,
                Email = x.Email,
                Department = x.Department
            }).ToList();
        }
    }
}
