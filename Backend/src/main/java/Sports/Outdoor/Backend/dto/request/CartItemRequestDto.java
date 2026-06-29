package Sports.Outdoor.Backend.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CartItemRequestDto {
    @NotNull(message = "Variant Boş Olamaz")
    private Long variantId;

    @NotNull(message = "Quantity Boş Olamaz")
    @Min(value = 1, message = "Miktar En Az 1 olması gerekir")
    private Integer quantity;
}
