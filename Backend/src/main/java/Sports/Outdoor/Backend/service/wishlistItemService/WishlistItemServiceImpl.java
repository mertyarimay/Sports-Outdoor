package Sports.Outdoor.Backend.service.wishlistItemService;


import Sports.Outdoor.Backend.dto.request.WishlistItemRequestDto;
import Sports.Outdoor.Backend.dto.response.WishlistItemResponseDto;
import Sports.Outdoor.Backend.entity.Product;
import Sports.Outdoor.Backend.entity.User;
import Sports.Outdoor.Backend.entity.Wishlist;
import Sports.Outdoor.Backend.entity.WishlistItem;
import Sports.Outdoor.Backend.exception.BadRequestException;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.ProductRepository;
import Sports.Outdoor.Backend.repository.UserRepository;
import Sports.Outdoor.Backend.repository.WishlistItemRepository;
import Sports.Outdoor.Backend.repository.WishlistRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class WishlistItemServiceImpl implements WishlistItemService{

    private final WishlistItemRepository wishlistItemRepository;
    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public WishlistItemResponseDto addToWishlist(WishlistItemRequestDto dto, Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User Bulunamadı"));

        Wishlist wishlist = wishlistRepository.findByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException("Wishlist not found"));

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new NotFoundException("Product Bulunamadı"));

        Optional<WishlistItem> existingItem = wishlistItemRepository.findByWishlistIdAndProductId(wishlist.getId(), product.getId());

        if (existingItem.isPresent()) {
            throw new BadRequestException("Product is already in wishlist");
        }

        WishlistItem wishlistItem = new WishlistItem();

        wishlistItem.setWishlist(wishlist);
        wishlistItem.setProduct(product);

        WishlistItem saved = wishlistItemRepository.save(wishlistItem);

        return convertToResponse(saved);
    }

    @Override
    public List<WishlistItemResponseDto> getMyWishlistItems(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User Bulunamadı"));

        Wishlist wishlist = wishlistRepository.findByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException("Wishlist Bulunamadı"));

        List<WishlistItem>wishlistItems=wishlistItemRepository.findByWishlistId(wishlist.getId());
        List<WishlistItemResponseDto>wishlistItemResponseDtos=wishlistItems.stream().map(wishlistItem -> convertToResponse(wishlistItem)).collect(Collectors.toList());
        return wishlistItemResponseDtos;
    }

    @Override
    public void delete(Long id, Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User Bulunamadı"));

        WishlistItem wishlistItem = wishlistItemRepository.findById(id)
                        .orElseThrow(() -> new NotFoundException("Wishlist item Bulunamadı"));

        if (!wishlistItem.getWishlist().getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Bu istek listesi öğesini silemezsiniz Yetkisiz İşlem.");
        }

        wishlistItemRepository.delete(wishlistItem);
    }

    private WishlistItemResponseDto convertToResponse(WishlistItem wishlistItem) {

        WishlistItemResponseDto dto = new WishlistItemResponseDto();

        dto.setId(wishlistItem.getId());

        dto.setWishlistId(wishlistItem.getWishlist().getId());

        dto.setProductId(wishlistItem.getProduct().getId());

        dto.setProductName(wishlistItem.getProduct().getName());

        dto.setSlug(wishlistItem.getProduct().getSlug());

        dto.setBrandName(wishlistItem.getProduct().getBrand().getName());
        return dto;
    }



}
