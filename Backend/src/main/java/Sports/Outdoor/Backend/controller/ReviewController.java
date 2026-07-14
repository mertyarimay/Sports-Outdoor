package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.ReviewRequestDto;
import Sports.Outdoor.Backend.dto.response.ReviewResponseDto;
import Sports.Outdoor.Backend.service.reviewService.ReviewService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@AllArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/create")
    public ResponseEntity<ReviewResponseDto> createReview(@Valid @RequestBody ReviewRequestDto dto, Authentication authentication) {
        return ResponseEntity.ok(reviewService.createReview(dto, authentication));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<ReviewResponseDto> updateReview(@PathVariable Long id, @Valid @RequestBody ReviewRequestDto dto, Authentication authentication) {
        return ResponseEntity.ok(reviewService.updateReview(id, dto, authentication));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id, Authentication authentication) {
        reviewService.deleteReview(id, authentication);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/my")
    public ResponseEntity<List<ReviewResponseDto>> getMyReviews(Authentication authentication) {
        return ResponseEntity.ok(reviewService.getMyReviews(authentication));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewResponseDto>> getProductReviews(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getProductReviews(productId));
    }

    @GetMapping("/product/{productId}/average-rating")
    public ResponseEntity<Double> getAverageRating(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getAverageRating(productId));
    }

    @GetMapping("/product/{productId}/review-count")
    public ResponseEntity<Long> getReviewCount(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getReviewCount(productId));
    }
}
