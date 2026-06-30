package Sports.Outdoor.Backend.service.wishlistService;

import Sports.Outdoor.Backend.dto.response.WishlistResponseDto;
import Sports.Outdoor.Backend.entity.User;
import Sports.Outdoor.Backend.entity.Wishlist;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.UserRepository;
import Sports.Outdoor.Backend.repository.WishlistRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class WishlistServiceImpl implements WishlistService{
    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;

    @Override
    public WishlistResponseDto createWishlist(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User Bulunamadı"));

        Wishlist existingWishlist = wishlistRepository.findByUserId(user.getId()).orElse(null);

        if (existingWishlist != null) {
            return convertToResponse(existingWishlist);
        }
        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);

        Wishlist saved = wishlistRepository.save(wishlist);
        return convertToResponse(saved);
    }

    @Override
    public WishlistResponseDto getMyWishlist(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User Bulanamadı"));

        Wishlist wishlist = wishlistRepository.findByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException("Wishlist Bulunamadı"));

        return convertToResponse(wishlist);
    }

    private WishlistResponseDto convertToResponse(Wishlist wishlist) {

        WishlistResponseDto dto = new WishlistResponseDto();

        dto.setId(wishlist.getId());
        dto.setUserId(wishlist.getUser().getId());
        dto.setUserEmail(wishlist.getUser().getEmail());

        return dto;
    }

}
