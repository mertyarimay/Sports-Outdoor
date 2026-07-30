package Sports.Outdoor.Backend.dto.request;

import Sports.Outdoor.Backend.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateOrderStatusRequestDto {
    @NotNull(message = "Status cannot be null")
    private OrderStatus status;
}

