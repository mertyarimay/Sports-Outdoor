package Sports.Outdoor.Backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequestDto {
    @NotNull(message = "Product id is required.")
    private Long productId;

    @NotNull(message = "Rating is required.")
    @Min(value = 1, message = "Rating must be at least 1.")
    @Max(value = 5, message = "Rating cannot be greater than 5.")
    private Integer rating;

    @NotBlank(message = "Comment is required.")
    @Size(max = 1000, message = "Comment cannot exceed 1000 characters.")
    private String comment;
}
