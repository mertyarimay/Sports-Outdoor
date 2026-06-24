package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.LoginRequestDto;
import Sports.Outdoor.Backend.dto.request.UserRequestDto;
import Sports.Outdoor.Backend.dto.response.AuthResponseDto;
import Sports.Outdoor.Backend.dto.response.UserResponseDto;
import Sports.Outdoor.Backend.service.authService.AuthService;
import Sports.Outdoor.Backend.service.userService.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/register")
    public UserResponseDto register(@Valid @RequestBody UserRequestDto dto) {
        return userService.register(dto);
    }
    @PostMapping("/login")
    public AuthResponseDto login(@Valid @RequestBody LoginRequestDto dto) {
        return authService.login(dto);
    }

}
