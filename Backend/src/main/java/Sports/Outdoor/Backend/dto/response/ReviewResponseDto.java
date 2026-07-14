package Sports.Outdoor.Backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponseDto {
    private Long id;

    private Integer rating;

    private String comment;

    private LocalDateTime createdAt;

    private Long userId;

    private String userName;

    private Long productId;

    private String productName;

}
