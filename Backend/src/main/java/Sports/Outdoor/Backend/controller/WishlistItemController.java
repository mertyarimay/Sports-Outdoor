package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.WishlistItemRequestDto;
import Sports.Outdoor.Backend.dto.response.WishlistItemResponseDto;
import Sports.Outdoor.Backend.service.wishlistItemService.WishlistItemService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/wishlist-items")
public class WishlistItemController {
    private final WishlistItemService wishlistItemService;

    @PostMapping("/create")
    public WishlistItemResponseDto addToWishlist(@Valid @RequestBody WishlistItemRequestDto dto, Authentication authentication) {

        return wishlistItemService.addToWishlist(dto, authentication);
    }

    @GetMapping("/my")
    public List<WishlistItemResponseDto> getMyWishlistItems(Authentication authentication) {

        return wishlistItemService.getMyWishlistItems(authentication);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id, Authentication authentication) {
        wishlistItemService.delete(id, authentication);
    }
}
