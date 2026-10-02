package Sports.Outdoor.Backend.service.userService;

import Sports.Outdoor.Backend.dto.request.UpdateUserRoleRequestDto;
import Sports.Outdoor.Backend.dto.request.UserRequestDto;
import Sports.Outdoor.Backend.dto.response.UserResponseDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface UserService {
    UserResponseDto register(UserRequestDto dto);

    UserResponseDto getCurrentUser(Authentication authentication);
    UserResponseDto getUserById(Long id);

    UserResponseDto updateUserRole(Long id, UpdateUserRoleRequestDto dto);

    List<UserResponseDto> getAllUsers();

    Boolean deleteUser(Long id);

    UserResponseDto updateUserActive(Long id, Boolean active);
}
