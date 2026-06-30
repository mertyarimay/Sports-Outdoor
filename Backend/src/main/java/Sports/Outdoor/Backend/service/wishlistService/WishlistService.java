package Sports.Outdoor.Backend.service.wishlistService;

import Sports.Outdoor.Backend.dto.response.WishlistResponseDto;
import org.springframework.security.core.Authentication;

public interface WishlistService {

    WishlistResponseDto createWishlist(Authentication authentication);

    WishlistResponseDto getMyWishlist(Authentication authentication);
}
