package Sports.Outdoor.Backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockResponseDto {
    private Long id;

    private Integer quantity;

    private Long variantId;

    private String sku;

    private String color;

    private String size;
}
