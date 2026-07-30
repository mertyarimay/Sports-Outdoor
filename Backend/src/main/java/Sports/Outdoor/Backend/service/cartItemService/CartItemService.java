package Sports.Outdoor.Backend.service.cartItemService;

import Sports.Outdoor.Backend.dto.request.CartItemRequestDto;
import Sports.Outdoor.Backend.dto.response.CartItemResponseDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface CartItemService {
    CartItemResponseDto addToCart(CartItemRequestDto dto, Authentication authentication);

    List<CartItemResponseDto> getMyCartItems(Authentication authentication);

    boolean delete(Long id,Authentication authentication);
}
