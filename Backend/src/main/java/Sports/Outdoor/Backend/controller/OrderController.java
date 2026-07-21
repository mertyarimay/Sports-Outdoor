package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.OrderRequestDto;
import Sports.Outdoor.Backend.dto.request.UpdateOrderStatusRequestDto;
import Sports.Outdoor.Backend.dto.response.OrderResponseDto;
import Sports.Outdoor.Backend.service.orderService.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/create")
    public OrderResponseDto createOrder(@Valid @RequestBody OrderRequestDto dto, Authentication authentication) {
        return orderService.createOrder(dto, authentication);
    }

    @GetMapping("/my")
    public List<OrderResponseDto> getMyOrders(Authentication authentication) {
        return orderService.getMyOrders(authentication);
    }

    @GetMapping("getById/{id}")
    public OrderResponseDto getOrderById(@PathVariable Long id, Authentication authentication) {
        return orderService.getOrderById(id, authentication);
    }

    @PutMapping("/{id}/cancel")
    public OrderResponseDto cancelOrder(@PathVariable Long id, Authentication authentication) {
        return orderService.cancelOrder(id, authentication);
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/all")
    public List<OrderResponseDto> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/{id}")
    public OrderResponseDto getOrderByIdForAdmin(@PathVariable Long id) {
        return orderService.getOrderByIdForAdmin(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PatchMapping("/admin/{id}/status")
    public OrderResponseDto updateOrderStatus(@PathVariable Long id, @RequestBody UpdateOrderStatusRequestDto dto) {
        return orderService.updateOrderStatus(id, dto);
    }





}
