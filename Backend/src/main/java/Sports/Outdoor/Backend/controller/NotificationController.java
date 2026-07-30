package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.response.NotificationResponseDto;
import Sports.Outdoor.Backend.service.notificationService.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/my")
    public List<NotificationResponseDto> getMyNotifications(Authentication authentication) {
        return notificationService.getMyNotifications(authentication);
    }

    @PutMapping("/{id}/read")
    public NotificationResponseDto markAsRead(@PathVariable Long id, Authentication authentication) {
        return notificationService.markAsRead(id, authentication);
    }
    @PutMapping("/read-all")
    public ResponseEntity<String> markAllAsRead(Authentication authentication) {
        notificationService.markAllAsRead(authentication);
        return ResponseEntity.ok("All notifications marked as read.");
    }
}
