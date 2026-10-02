package Sports.Outdoor.Backend.service.cartItemService;

import Sports.Outdoor.Backend.dto.request.CartItemRequestDto;
import Sports.Outdoor.Backend.dto.response.CartItemResponseDto;
import Sports.Outdoor.Backend.entity.Cart;
import Sports.Outdoor.Backend.entity.CartItem;
import Sports.Outdoor.Backend.entity.Product;
import Sports.Outdoor.Backend.entity.ProductImage;
import Sports.Outdoor.Backend.entity.ProductVariant;
import Sports.Outdoor.Backend.entity.Stock;
import Sports.Outdoor.Backend.entity.User;
import Sports.Outdoor.Backend.exception.BusinessExcepiton;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.CartItemRepository;
import Sports.Outdoor.Backend.repository.CartRepository;
import Sports.Outdoor.Backend.repository.ProductImageRepository;
import Sports.Outdoor.Backend.repository.ProductVariantRepository;
import Sports.Outdoor.Backend.repository.StockRepository;
import Sports.Outdoor.Backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartItemServiceImpl
        implements CartItemService {

    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final ProductVariantRepository variantRepository;
    private final UserRepository userRepository;
    private final StockRepository stockRepository;
    private final ProductImageRepository productImageRepository;

    @Override
    public CartItemResponseDto addToCart(CartItemRequestDto dto, Authentication authentication) {

        if (dto.getQuantity() == null || dto.getQuantity() < 1) {

            throw new BusinessExcepiton("Miktar en az 1 olmalıdır");
        }

        User user = getAuthenticatedUser(authentication);

        Cart cart = cartRepository.findByUserId(user.getId()).orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        ProductVariant variant = variantRepository.findById(dto.getVariantId()).orElseThrow(() ->
                        new NotFoundException("Product variant bulunamadı"));

        Product product = variant.getProduct();

        if (product == null) {
            throw new BusinessExcepiton("Variant bir ürüne bağlı değil");
        }

        if (!Boolean.TRUE.equals(product.getActive()
        )) {
            throw new BusinessExcepiton("Bu ürün şu anda satışta değil");
        }

        Stock stock = stockRepository.findByVariantId(variant.getId())
                        .orElseThrow(() -> new BusinessExcepiton("Bu varyanta ait stok bulunamadı"));

        if (stock.getQuantity() == null || stock.getQuantity() <= 0) {

            throw new BusinessExcepiton("Bu ürün stokta yok");
        }

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

                throw new BusinessExcepiton("Yeterli stok yok. Mevcut stok: " + stock.getQuantity());
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

        User user = getAuthenticatedUser(authentication);

        Cart cart = cartRepository.findByUserId(user.getId()).orElseThrow(() ->
                                new BusinessExcepiton("Cart bulunamadı"));

        return cartItemRepository
                .findByCartId(cart.getId())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public CartItemResponseDto updateQuantity(Long id, Integer quantity, Authentication authentication) {

        if (quantity == null || quantity < 1) {

            throw new BusinessExcepiton("Miktar en az 1 olmalıdır");
        }

        CartItem cartItem = cartItemRepository.findById(id).orElseThrow(() ->
                                new NotFoundException("Cart item bulunamadı"));

        User user = getAuthenticatedUser(authentication);

        validateOwnership(cartItem, user);

        ProductVariant variant = cartItem.getVariant();

        Product product = variant.getProduct();

        if (!Boolean.TRUE.equals(product.getActive())) {

            throw new BusinessExcepiton("Bu ürün artık satışta değil");
        }

        Stock stock = stockRepository.findByVariantId(variant.getId()).orElseThrow(() ->
                                new BusinessExcepiton("Stock bulunamadı"));

        if (quantity > stock.getQuantity()) {

            throw new BusinessExcepiton("Yeterli stok yok. Mevcut stok: " + stock.getQuantity());
        }

        cartItem.setQuantity(quantity);

        CartItem updated = cartItemRepository.save(cartItem);

        return convertToResponse(updated);
    }

    @Override
    public boolean delete(Long id, Authentication authentication) {

        CartItem cartItem = cartItemRepository.findById(id).orElseThrow(() ->
                                new NotFoundException("Cart item bulunamadı"));

        User user = getAuthenticatedUser(authentication);

        validateOwnership(cartItem, user);

        cartItemRepository.delete(cartItem);

        return true;
    }

    private User getAuthenticatedUser(Authentication authentication) {

        if (authentication == null) {
            throw new AccessDeniedException("Giriş yapmalısınız");
        }

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User bulunamadı"));
    }

    private void validateOwnership(CartItem cartItem, User user) {

        if (!cartItem.getCart().getUser().getId().equals(user.getId())) {

            throw new AccessDeniedException("Bu sepet ürününe erişemezsiniz");
        }
    }

    private CartItemResponseDto convertToResponse(CartItem cartItem) {

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

        dto.setItemTotal(unitPrice.multiply(BigDecimal.valueOf(cartItem.getQuantity())));

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