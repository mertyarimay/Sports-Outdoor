package Sports.Outdoor.Backend.dto.response;

import Sports.Outdoor.Backend.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDto {
    private String orderNumber;

    private LocalDateTime orderDate;

    private BigDecimal totalPrice;

    private OrderStatus status;

    private Long userId;

    private String userEmail;

    private Long addressId;

    private String city;

    private String district;

    private String fullAddress;

    private List<OrderItemResponseDto> items;
}
