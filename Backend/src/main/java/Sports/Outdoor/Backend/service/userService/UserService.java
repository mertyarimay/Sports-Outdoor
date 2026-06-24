package Sports.Outdoor.Backend.service.userService;

import Sports.Outdoor.Backend.dto.request.UserRequestDto;
import Sports.Outdoor.Backend.dto.response.UserResponseDto;
import org.springframework.security.core.Authentication;

public interface UserService {
    UserResponseDto register(UserRequestDto dto);

    UserResponseDto getCurrentUser(Authentication authentication);
}
