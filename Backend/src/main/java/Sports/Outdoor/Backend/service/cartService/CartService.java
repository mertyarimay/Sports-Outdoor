package Sports.Outdoor.Backend.service.cartService;

import Sports.Outdoor.Backend.dto.response.CartResponseDto;
import org.springframework.security.core.Authentication;

public interface CartService {

    CartResponseDto createCartForUser(Authentication authentication);

    CartResponseDto getMyCart(Authentication authentication);

    void clearCart(Authentication authentication);
}