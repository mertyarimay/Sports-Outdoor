package Sports.Outdoor.Backend.service.reviewService;

import Sports.Outdoor.Backend.dto.request.ReviewRequestDto;
import Sports.Outdoor.Backend.dto.response.ReviewResponseDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ReviewService {

    ReviewResponseDto createReview(ReviewRequestDto dto, Authentication authentication);

    ReviewResponseDto updateReview(Long id, ReviewRequestDto dto, Authentication authentication);

    void deleteReview(Long id, Authentication authentication);

    List<ReviewResponseDto> getMyReviews(Authentication authentication);

    List<ReviewResponseDto> getProductReviews(Long productId);

    Double getAverageRating(Long productId);

    Long getReviewCount(Long productId);
}
