package Sports.Outdoor.Backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartResponseDto {

    private Long id;

    private Long userId;

    private String userEmail;

    private List<CartItemResponseDto> items;

    private BigDecimal totalPrice;
}