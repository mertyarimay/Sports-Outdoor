package Sports.Outdoor.Backend.service.cartService;

import Sports.Outdoor.Backend.dto.response.CartResponseDto;
import Sports.Outdoor.Backend.entity.Cart;
import Sports.Outdoor.Backend.entity.User;
import Sports.Outdoor.Backend.exception.BusinessExcepiton;
import Sports.Outdoor.Backend.repository.CartRepository;
import Sports.Outdoor.Backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CartServiceImpl implements  CartService{

    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    @Override
    public CartResponseDto createCartForUser(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElse(null);
        if(user==null){
            throw new BusinessExcepiton("User Bulunamadı");
        }

        Cart existingCart = cartRepository.findByUserId(user.getId())
                .orElse(null);

        if (existingCart != null) {
            return convertToResponse(existingCart);
        }

        Cart cart = new Cart();
        cart.setUser(user);

        Cart saved = cartRepository.save(cart);

        return convertToResponse(saved);
    }

    @Override
    public CartResponseDto getMyCart(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessExcepiton("User Bulunamadı"));

        Cart cart=cartRepository.findByUserId(user.getId())
                .orElseThrow(()-> new BusinessExcepiton("Cart Bulunamadı"));

        return convertToResponse(cart);
    }

    private CartResponseDto convertToResponse(Cart cart) {

        CartResponseDto dto = new CartResponseDto();

        dto.setId(cart.getId());
        dto.setUserId(cart.getUser().getId());
        dto.setUserEmail(cart.getUser().getEmail());

        return dto;
    }

}
