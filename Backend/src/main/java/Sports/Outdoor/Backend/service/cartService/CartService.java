package Sports.Outdoor.Backend.service.cartService;

import Sports.Outdoor.Backend.dto.response.CartResponseDto;
import org.springframework.security.core.Authentication;

public interface CartService {
    CartResponseDto getMyCart(Authentication authentication);

    CartResponseDto createCartForUser(Authentication authentication);
}
