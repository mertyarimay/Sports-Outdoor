package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.CartItemRequestDto;
import Sports.Outdoor.Backend.dto.response.CartItemResponseDto;
import Sports.Outdoor.Backend.service.cartItemService.CartItemService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/cart-items")
public class CartItemController {
    private final CartItemService cartItemService;

    @PostMapping("/create")
    public CartItemResponseDto addToCart(@Valid @RequestBody CartItemRequestDto dto, Authentication authentication) {
        return cartItemService.addToCart(dto, authentication);
    }

    @GetMapping("/my")
    public List<CartItemResponseDto> getMyCartItems(Authentication authentication) {
        return cartItemService.getMyCartItems(authentication);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        boolean delete=cartItemService.delete(id);
        if(delete==true){
            return ResponseEntity.ok("Silme İşlemi Başarılı");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Silme İşlemi Başarısız");
    }



}
