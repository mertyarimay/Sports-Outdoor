package Sports.Outdoor.Backend.service.orderService;

import Sports.Outdoor.Backend.dto.request.OrderRequestDto;
import Sports.Outdoor.Backend.dto.request.UpdateOrderStatusRequestDto;
import Sports.Outdoor.Backend.dto.response.OrderItemResponseDto;
import Sports.Outdoor.Backend.dto.response.OrderResponseDto;
import Sports.Outdoor.Backend.entity.*;
import Sports.Outdoor.Backend.enums.CouponType;
import Sports.Outdoor.Backend.enums.OrderStatus;
import Sports.Outdoor.Backend.exception.BadRequestException;
import Sports.Outdoor.Backend.exception.BusinessExcepiton;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.*;
import Sports.Outdoor.Backend.service.couponService.CouponService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    private final StockRepository stockRepository;

    private final CouponService couponService;

    private final CouponUsageRepository couponUsageRepository;

    private final CouponRepository couponRepository;


    @Override
    @Transactional
    public OrderResponseDto createOrder(OrderRequestDto dto, Authentication authentication) {

        // JWT'den kullanıcıyı al
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User not found"));

        // Adresi bul
        Address address = addressRepository.findById(dto.getAddressId())
                .orElseThrow(() -> new NotFoundException("Address not found"));

        // Adres kullanıcıya mı ait?
        if (!address.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Başka bir kullanıcının adresini kullanamazsınız.");
        }

        // Kullanıcının sepeti
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException("Cart not found"));

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());

        // Sepet boş mu?
        if (cartItems.isEmpty()) {
            throw new BadRequestException("Cart is empty.");
        }

        // Önce stok kontrolü ve toplam fiyat hesapla
        BigDecimal totalPrice = BigDecimal.ZERO;

        for (CartItem cartItem : cartItems) {

            ProductVariant variant = cartItem.getVariant();

            Stock stock = stockRepository.findByVariantId(variant.getId())
                    .orElseThrow(() -> new NotFoundException("Stock not found"));

            if (stock.getQuantity() < cartItem.getQuantity()) {
                throw new BusinessExcepiton(variant.getSku() + " is out of stock.");
            }

            BigDecimal unitPrice = getUnitPrice(variant);

            totalPrice = totalPrice.add(unitPrice.multiply(BigDecimal.valueOf(cartItem.getQuantity())));
        }

        Coupon coupon = null;

        if (dto.getCouponCode() != null && !dto.getCouponCode().isBlank()) {

            coupon = couponService.validateCoupon(dto.getCouponCode(), totalPrice);

            if (couponUsageRepository.existsByUserIdAndCouponId(user.getId(), coupon.getId())) {

                throw new BusinessExcepiton("You have already used this coupon");
            }

            BigDecimal discount;

            if (coupon.getType() == CouponType.PERCENTAGE) {

                discount = totalPrice.multiply(coupon.getDiscountValue().divide(BigDecimal.valueOf(100)));
            }
            else {

                discount = coupon.getDiscountValue();
            }

            totalPrice = totalPrice.subtract(discount);

            if (totalPrice.compareTo(BigDecimal.ZERO) < 0) {
                totalPrice = BigDecimal.ZERO;
            }
        }

        // Order oluştur
        Order order = new Order();

        order.setUser(user);
        order.setAddress(address);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);
        order.setTotalPrice(totalPrice);
        order.setOrderNumber(generateOrderNumber());

        Order savedOrder = orderRepository.save(order);

        // OrderItem oluştur ve stok düş
        for (CartItem cartItem : cartItems) {

            ProductVariant variant = cartItem.getVariant();

            BigDecimal unitPrice = getUnitPrice(variant);

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(savedOrder);
            orderItem.setVariant(variant);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(unitPrice);

            orderItem.setTotalPrice(unitPrice.multiply(BigDecimal.valueOf(cartItem.getQuantity())));

            orderItemRepository.save(orderItem);

            Stock stock = stockRepository.findByVariantId(variant.getId())
                    .orElseThrow(() -> new NotFoundException("Stock not found"));

            stock.setQuantity(stock.getQuantity() - cartItem.getQuantity());
            stockRepository.save(stock);
        }
        if (coupon != null) {

            coupon.setUsedCount(coupon.getUsedCount() + 1);

            couponRepository.save(coupon);

            CouponUsageEntity couponUsage = new CouponUsageEntity();

            couponUsage.setUser(user);

            couponUsage.setCoupon(coupon);

            couponUsage.setUsedAt(LocalDateTime.now());

            couponUsageRepository.save(couponUsage);
        }

        // Sepeti temizle
        cartItemRepository.deleteAll(cartItems);

        return convertToResponse(savedOrder);

    }
    @Override
    public List<OrderResponseDto> getMyOrders(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User not found"));

        return orderRepository.findByUserIdOrderByOrderDateDesc(user.getId())
                .stream().map(this::convertToResponse).toList();
    }

    @Override
    public OrderResponseDto getOrderById(Long id, Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User not found"));

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Bu siparişi görüntüleyemezsiniz.");
        }

        return convertToResponse(order);
    }

    @Override
    @Transactional
    public OrderResponseDto cancelOrder(Long id, Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User not found"));

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Bu siparişi iptal edemezsiniz.");
        }

        if (order.getStatus() == OrderStatus.SHIPPED || order.getStatus() == OrderStatus.DELIVERED || order.getStatus() == OrderStatus.CANCELLED) {
            throw new BusinessExcepiton("Bu sipariş iptal edilemez.");
        }

        List<OrderItem> orderItems = orderItemRepository.findByOrderId(order.getId());

        // Stokları geri ekle
        for (OrderItem orderItem : orderItems) {

            Stock stock = stockRepository
                    .findByVariantId(orderItem.getVariant().getId())
                    .orElseThrow(() -> new NotFoundException("Stock not found"));

            stock.setQuantity(stock.getQuantity() + orderItem.getQuantity()
            );

            stockRepository.save(stock);
        }

        order.setStatus(OrderStatus.CANCELLED);

        orderRepository.save(order);

        return convertToResponse(order);
    }

    @Override
    public List<OrderResponseDto> getAllOrders() {

        return orderRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public OrderResponseDto getOrderByIdForAdmin(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException("Order not found"));

        return convertToResponse(order);
    }


    @Override
    @Transactional
    public OrderResponseDto updateOrderStatus(Long id, UpdateOrderStatusRequestDto dto) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException("Order not found"));

        order.setStatus(dto.getStatus());

        orderRepository.save(order);

        return convertToResponse(order);
    }


    private OrderItemResponseDto convertToOrderItemResponse(OrderItem orderItem) {
        OrderItemResponseDto dto = new OrderItemResponseDto();

        dto.setId(orderItem.getId());

        dto.setVariantId(orderItem.getVariant().getId());

        dto.setSku(orderItem.getVariant().getSku());

        dto.setProductName(orderItem.getVariant().getProduct().getName());

        dto.setColor(orderItem.getVariant().getColor());

        dto.setSize(orderItem.getVariant().getSize());

        dto.setQuantity(orderItem.getQuantity());

        dto.setUnitPrice(orderItem.getUnitPrice());

        dto.setTotalPrice(orderItem.getTotalPrice());

        return dto;
    }
    private OrderResponseDto convertToResponse(Order order) {

        OrderResponseDto dto = new OrderResponseDto();

        dto.setOrderNumber(order.getOrderNumber());

        dto.setOrderDate(order.getOrderDate());

        dto.setTotalPrice(order.getTotalPrice());

        dto.setStatus(order.getStatus());

        dto.setUserId(order.getUser().getId());

        dto.setUserEmail(order.getUser().getEmail());

        dto.setAddressId(order.getAddress().getId());

        dto.setCity(order.getAddress().getCity());

        dto.setDistrict(order.getAddress().getDistrict());

        dto.setFullAddress(order.getAddress().getFullAddress());


        List<OrderItemResponseDto> items = orderItemRepository
                        .findByOrderId(order.getId())
                        .stream()
                        .map(this::convertToOrderItemResponse)
                        .toList();

        dto.setItems(items);

        return dto;
    }

    private String generateOrderNumber() {

        return "ORD-" + System.currentTimeMillis();
    }
    private BigDecimal getUnitPrice(ProductVariant variant ) {

            if (variant.getProduct().getDiscountPrice() != null) {
                return variant.getProduct().getDiscountPrice();
            }

            return variant.getProduct().getPrice();
        }
}
