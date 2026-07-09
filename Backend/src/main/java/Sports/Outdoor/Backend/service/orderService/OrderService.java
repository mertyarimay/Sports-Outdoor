package Sports.Outdoor.Backend.service.orderService;

import Sports.Outdoor.Backend.dto.request.OrderRequestDto;
import Sports.Outdoor.Backend.dto.response.OrderResponseDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface OrderService {
    OrderResponseDto createOrder(OrderRequestDto dto, Authentication authentication);

    List<OrderResponseDto> getMyOrders(Authentication authentication);

    OrderResponseDto getOrderById(Long id, Authentication authentication);

    OrderResponseDto cancelOrder(Long id, Authentication authentication);
}
