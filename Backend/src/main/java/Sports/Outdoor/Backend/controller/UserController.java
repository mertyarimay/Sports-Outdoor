package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.UpdateUserRoleRequestDto;
import Sports.Outdoor.Backend.dto.response.UserResponseDto;
import Sports.Outdoor.Backend.service.userService.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public UserResponseDto me(Authentication authentication) {
        return userService.getCurrentUser(authentication);
    }


   @PreAuthorize("hasAuthority('ADMIN')")
   @GetMapping("/admin/all")
   public List<UserResponseDto> getAllUsers(){
        return userService.getAllUsers();
}
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/{id}")
    public UserResponseDto getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/{id}/role")
    public UserResponseDto updateUserRole(@PathVariable Long id, @Valid @RequestBody UpdateUserRoleRequestDto dto) {
        return userService.updateUserRole(id, dto);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id) {
        Boolean deleted = userService.deleteUser(id);
        if (deleted) {
            return ResponseEntity.ok("Kullanıcı silme işlemi başarılı");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Kullanıcı silinemedi");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/{id}/active")
    public UserResponseDto updateUserActive(@PathVariable Long id, @RequestParam Boolean active) {
        return userService.updateUserActive(id, active);
    }
}

