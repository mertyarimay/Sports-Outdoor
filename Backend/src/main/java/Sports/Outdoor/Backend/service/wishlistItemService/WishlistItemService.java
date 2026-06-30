package Sports.Outdoor.Backend.service.wishlistItemService;

import Sports.Outdoor.Backend.dto.request.WishlistItemRequestDto;
import Sports.Outdoor.Backend.dto.response.WishlistItemResponseDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface WishlistItemService {

    WishlistItemResponseDto addToWishlist(WishlistItemRequestDto dto, Authentication authentication);

    List<WishlistItemResponseDto>getMyWishlistItems(Authentication authentication);

    void delete(Long id, Authentication authentication);
}
