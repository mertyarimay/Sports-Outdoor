package Sports.Outdoor.Backend.dto.request;

import Sports.Outdoor.Backend.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateOrderStatusRequestDto {
    private OrderStatus status;
}

