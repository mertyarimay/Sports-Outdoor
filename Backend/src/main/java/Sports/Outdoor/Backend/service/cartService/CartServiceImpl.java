package Sports.Outdoor.Backend.service.cartService;

import Sports.Outdoor.Backend.dto.response.CartItemResponseDto;
import Sports.Outdoor.Backend.dto.response.CartResponseDto;
import Sports.Outdoor.Backend.entity.Cart;
import Sports.Outdoor.Backend.entity.CartItem;
import Sports.Outdoor.Backend.entity.Product;
import Sports.Outdoor.Backend.entity.ProductImage;
import Sports.Outdoor.Backend.entity.ProductVariant;
import Sports.Outdoor.Backend.entity.User;
import Sports.Outdoor.Backend.exception.BusinessExcepiton;
import Sports.Outdoor.Backend.repository.CartItemRepository;
import Sports.Outdoor.Backend.repository.CartRepository;
import Sports.Outdoor.Backend.repository.ProductImageRepository;
import Sports.Outdoor.Backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductImageRepository productImageRepository;

    @Override
    public CartResponseDto createCartForUser(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);

        Cart existingCart =cartRepository.findByUserId(user.getId()).orElse(null);

        if (existingCart != null) {
            return convertToResponse(existingCart);
        }

        Cart cart = new Cart();
        cart.setUser(user);

        Cart savedCart = cartRepository.save(cart);

        return convertToResponse(savedCart);
    }

    @Override
    public CartResponseDto getMyCart(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new BusinessExcepiton("Cart bulunamadı"));
        return convertToResponse(cart);
    }

    @Override
    public void clearCart(Authentication authentication) {

        User user = getAuthenticatedUser(authentication);

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new BusinessExcepiton("Cart bulunamadı"));

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());

        if (!cartItems.isEmpty()) {
            cartItemRepository.deleteAll(cartItems);
        }
    }

    private User getAuthenticatedUser(Authentication authentication) {

        if (authentication == null || authentication.getName() == null) {

            throw new BusinessExcepiton("Kullanıcı girişi bulunamadı");
        }

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new BusinessExcepiton("User bulunamadı"));
    }

    private CartResponseDto convertToResponse(Cart cart) {

        CartResponseDto dto = new CartResponseDto();

        dto.setId(cart.getId());
        dto.setUserId(cart.getUser().getId());
        dto.setUserEmail(cart.getUser().getEmail());

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());

        List<CartItemResponseDto> items = cartItems.stream()
                        .map(this::convertItemToResponse)
                        .toList();

        dto.setItems(items);

        BigDecimal totalPrice = items.stream()
                        .map(CartItemResponseDto::getItemTotal)
                        .reduce(BigDecimal.ZERO, BigDecimal::add);

        dto.setTotalPrice(totalPrice);

        return dto;
    }

    private CartItemResponseDto convertItemToResponse(CartItem cartItem) {

        CartItemResponseDto dto = new CartItemResponseDto();

        ProductVariant variant = cartItem.getVariant();

        Product product = variant.getProduct();

        dto.setId(cartItem.getId());
        dto.setCartId(cartItem.getCart().getId());
        dto.setVariantId(variant.getId());

        dto.setSku(variant.getSku());
        dto.setColor(variant.getColor());
        dto.setSize(variant.getSize());

        dto.setProductName(product.getName());

        if (product.getBrand() != null) {
            dto.setBrandName(product.getBrand().getName());
        }

        dto.setPrice(product.getPrice());
        dto.setDiscountPrice(product.getDiscountPrice());

        dto.setQuantity(cartItem.getQuantity());

        BigDecimal unitPrice = getEffectivePrice(product);

        BigDecimal itemTotal = unitPrice.multiply(BigDecimal.valueOf(cartItem.getQuantity()));

        dto.setItemTotal(itemTotal);

        List<ProductImage> mainImages = productImageRepository.findByProductIdAndMainImageTrue(product.getId());

        if (!mainImages.isEmpty()) {
            dto.setImageUrl(mainImages.get(0).getImageUrl());
        }

        return dto;
    }

    private BigDecimal getEffectivePrice(Product product) {

        if (product.getDiscountPrice() != null) {
            return product.getDiscountPrice();
        }

        return product.getPrice();
    }
}