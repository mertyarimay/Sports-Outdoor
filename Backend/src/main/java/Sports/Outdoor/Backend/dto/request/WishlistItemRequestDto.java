package Sports.Outdoor.Backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor

public class WishlistItemRequestDto {
    @NotNull(message = "Product id cannot be null")
    private Long productId;
}
