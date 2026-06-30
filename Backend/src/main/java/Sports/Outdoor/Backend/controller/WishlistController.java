package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.response.WishlistResponseDto;
import Sports.Outdoor.Backend.service.wishlistService.WishlistService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/wishlists")
public class WishlistController {
    private final WishlistService wishlistService;

    @PostMapping("/create")
    public WishlistResponseDto createWishlist(Authentication authentication) {
        return wishlistService.createWishlist(authentication);
    }

    @GetMapping("/my")
    public WishlistResponseDto getMyWishlist(Authentication authentication) {
        return wishlistService.getMyWishlist(authentication);
    }
}
