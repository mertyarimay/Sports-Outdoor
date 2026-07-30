package Sports.Outdoor.Backend.service.cartItemService;

import Sports.Outdoor.Backend.dto.request.CartItemRequestDto;
import Sports.Outdoor.Backend.dto.response.CartItemResponseDto;
import Sports.Outdoor.Backend.entity.*;
import Sports.Outdoor.Backend.exception.BusinessExcepiton;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class CartItemServiceImpl implements CartItemService {
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final ProductVariantRepository variantRepository;
    private final UserRepository userRepository;
    private final StockRepository stockRepository;



    @Override
    public CartItemResponseDto addToCart(CartItemRequestDto dto, Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new BusinessExcepiton("User Bulunamadı"));

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new BusinessExcepiton("Cart bulunamadı"));

        ProductVariant variant = variantRepository.findById(dto.getVariantId())
                .orElseThrow(() -> new BusinessExcepiton("Product variant bulunamdı"));

        Stock stock = stockRepository.findByVariantId(variant.getId())
                .orElseThrow(() -> new BusinessExcepiton("Stock bulunamadı"));

        Optional<CartItem> existingItem = cartItemRepository.findByCartIdAndVariantId(cart.getId(), variant.getId());

        CartItem cartItem;

        if (existingItem.isPresent()) {

            cartItem = existingItem.get();

            int totalQuantity = cartItem.getQuantity() + dto.getQuantity();

            if (totalQuantity > stock.getQuantity()) {

                throw new BusinessExcepiton("Yeterli stok yok. Mevcut stok: " + stock.getQuantity());
            }
            cartItem.setQuantity(totalQuantity);

        } else {

            if (dto.getQuantity() > stock.getQuantity()) {
                throw new BusinessExcepiton("Yeterli stok yok. Mevcut stok. " + stock.getQuantity());
            }

            cartItem = new CartItem();

            cartItem.setCart(cart);
            cartItem.setVariant(variant);
            cartItem.setQuantity(dto.getQuantity());
        }

        CartItem saved = cartItemRepository.save(cartItem);

        return convertToResponse(saved);
    }

    @Override
    public List<CartItemResponseDto> getMyCartItems(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new BusinessExcepiton("User Bulunamadı"));

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new BusinessExcepiton("Cart Bulunamadı"));

        List<CartItem>cartItems=cartItemRepository.findByCartId(cart.getId());
        List<CartItemResponseDto>cartItemResponseDtos=cartItems.stream().map(cartItem -> convertToResponse(cartItem)).collect(Collectors.toList());
        return  cartItemResponseDtos;
    }

    @Override
    public boolean delete(Long id,Authentication authentication) {
        CartItem cartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Cart item not found"));

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User not found"));

        if (!cartItem.getCart().getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You cannot delete another user's cart item.");
        }

        cartItemRepository.delete(cartItem);
        return true;
    }
    private CartItemResponseDto convertToResponse(CartItem cartItem) {

        CartItemResponseDto dto = new CartItemResponseDto();

        dto.setId(cartItem.getId());

        dto.setQuantity(cartItem.getQuantity());

        dto.setCartId(cartItem.getCart().getId());

        dto.setVariantId(cartItem.getVariant().getId());

        dto.setSku(cartItem.getVariant().getSku());

        dto.setColor(cartItem.getVariant().getColor());

        dto.setSize(cartItem.getVariant().getSize());

        dto.setProductName(cartItem.getVariant().getProduct().getName());
        return dto;
    }
}
