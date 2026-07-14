package Sports.Outdoor.Backend.service.reviewService;

import Sports.Outdoor.Backend.dto.request.ReviewRequestDto;
import Sports.Outdoor.Backend.dto.response.ReviewResponseDto;
import Sports.Outdoor.Backend.entity.Product;
import Sports.Outdoor.Backend.entity.Review;
import Sports.Outdoor.Backend.entity.User;
import Sports.Outdoor.Backend.exception.BusinessExcepiton;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.OrderRepository;
import Sports.Outdoor.Backend.repository.ProductRepository;
import Sports.Outdoor.Backend.repository.ReviewRepository;
import Sports.Outdoor.Backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService{
    private final ReviewRepository reviewRepository;

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final OrderRepository orderRepository;


    @Override
    @Transactional
    public ReviewResponseDto createReview(ReviewRequestDto dto, Authentication authentication) {

        // JWT'den kullanıcıyı al
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User not found"));

        // Ürünü bul
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new NotFoundException("Product not found"));

        // Kullanıcı ürünü satın almış mı?
        if (!orderRepository.hasPurchasedProduct(user.getId(), product.getId())) {
            throw new BusinessExcepiton("Yalnızca satın aldığınız ve teslim aldığınız ürünler hakkında yorum yapabilirsiniz.");
        }

        // Aynı ürüne daha önce yorum yapmış mı?
        if (reviewRepository.existsByUserIdAndProductId(user.getId(), product.getId())) {
            throw new BusinessExcepiton("Bu ürünü daha önce değerlendirdiniz.");
        }

        // Review oluştur
        Review review = new Review();

        review.setUser(user);

        review.setProduct(product);

        review.setRating(dto.getRating());

        review.setComment(dto.getComment());

        Review savedReview = reviewRepository.save(review);

        return convertToResponse(savedReview);

    }

    @Override
    @Transactional
    public ReviewResponseDto updateReview(Long id, ReviewRequestDto dto, Authentication authentication) {

        // JWT'den kullanıcıyı al
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User not found"));

        // Review'u bul
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Review not found"));

        // Kendi yorumu mu?
        if (!review.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Başka bir kullanıcının yorumunu güncelleyemezsiniz.");
        }

        // Rating güncelle
        review.setRating(dto.getRating());

        // Comment güncelle
        review.setComment(dto.getComment());

        Review updatedReview = reviewRepository.save(review);

        return convertToResponse(updatedReview);
    }

    @Override
    @Transactional
    public void deleteReview(Long id, Authentication authentication) {

        // JWT'den kullanıcıyı al
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User not found"));

        // Review'u bul
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Review not found"));

        // Kendi yorumu mu?
        if (!review.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Başka bir kullanıcının yorumunu silemezsiniz.");
        }
        reviewRepository.delete(review);
    }

    @Override
    public List<ReviewResponseDto> getMyReviews(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User not found"));

        return reviewRepository.findByUserId(user.getId())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public List<ReviewResponseDto> getProductReviews(Long productId) {

        productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product not found"));

        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public Double getAverageRating(Long productId) {

        productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product not found"));

        Double average = reviewRepository.findAverageRatingByProductId(productId);

        return average != null ? average : 0.0; //average null değilse average dön yoksa 0.0 dön
    }

    @Override
    public Long getReviewCount(Long productId) {

        productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product not found"));

        return reviewRepository.countByProductId(productId);
    }

    private ReviewResponseDto convertToResponse(Review review) {

        ReviewResponseDto dto = new ReviewResponseDto();

        dto.setId(review.getId());

        dto.setRating(review.getRating());

        dto.setComment(review.getComment());

        dto.setCreatedAt(review.getCreatedAt());

        dto.setUserId(review.getUser().getId());

        dto.setUserName(review.getUser().getFirstName() + " " + review.getUser().getLastName());

        dto.setProductId(review.getProduct().getId());

        dto.setProductName(review.getProduct().getName());

        return dto;
    }
}
