package Sports.Outdoor.Backend.service.couponService;

import Sports.Outdoor.Backend.dto.request.CouponRequestDto;
import Sports.Outdoor.Backend.dto.response.CouponResponseDto;
import Sports.Outdoor.Backend.entity.Coupon;

import java.math.BigDecimal;
import java.util.List;

public interface CouponService {
    CouponResponseDto create(CouponRequestDto dto);

    CouponResponseDto getById(Long id);

    List<CouponResponseDto> getAll();

    CouponResponseDto update(Long id, CouponRequestDto dto);

    boolean delete(Long id);


    Coupon validateCoupon(String couponCode, BigDecimal totalPrice);
}
