package Sports.Outdoor.Backend.service.notificationService;

import Sports.Outdoor.Backend.dto.response.NotificationResponseDto;
import Sports.Outdoor.Backend.entity.User;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface NotificationService {
    void createNotification(User user, String title, String message);

    List<NotificationResponseDto> getMyNotifications(Authentication authentication);

    NotificationResponseDto markAsRead(Long id, Authentication authentication);

    void markAllAsRead(Authentication authentication);
}

