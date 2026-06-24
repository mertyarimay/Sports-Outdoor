package Sports.Outdoor.Backend.service.authService;

import Sports.Outdoor.Backend.dto.request.LoginRequestDto;
import Sports.Outdoor.Backend.dto.response.AuthResponseDto;

public interface AuthService {
    AuthResponseDto login(LoginRequestDto dto);
}
