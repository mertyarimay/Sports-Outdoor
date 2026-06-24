package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.response.UserResponseDto;
import Sports.Outdoor.Backend.service.userService.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public UserResponseDto me(Authentication authentication) {
        return userService.getCurrentUser(authentication);
    }
}
