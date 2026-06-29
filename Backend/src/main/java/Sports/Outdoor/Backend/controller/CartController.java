package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.response.CartResponseDto;
import Sports.Outdoor.Backend.service.cartService.CartService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/carts")
public class CartController {
    private final CartService cartService;

    @PostMapping("/create")
    public CartResponseDto createCart(Authentication authentication) {
        return cartService.createCartForUser(authentication);
    }

    @GetMapping("/my/cart")
    public CartResponseDto getMyCart(Authentication authentication) {
        return cartService.getMyCart(authentication);
    }
}
