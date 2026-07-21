package Sports.Outdoor.Backend.service.couponService;

import Sports.Outdoor.Backend.dto.request.CouponRequestDto;
import Sports.Outdoor.Backend.dto.response.CouponResponseDto;
import Sports.Outdoor.Backend.entity.Coupon;
import Sports.Outdoor.Backend.exception.BusinessExcepiton;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.CouponRepository;
import Sports.Outdoor.Backend.repository.CouponUsageRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final CouponRepository couponRepository;

    private final ModelMapper modelMapper;
    private final CouponUsageRepository couponUsageRepository;


    private CouponResponseDto convertToResponse(Coupon coupon) {

        return modelMapper.map(coupon, CouponResponseDto.class);
    }


    @Override
    public CouponResponseDto create(CouponRequestDto dto) {

        if (couponRepository.existsByCode(dto.getCode())) {

            throw new BusinessExcepiton("Coupon code already exists");
        }

        Coupon coupon = modelMapper.map(dto, Coupon.class);

        coupon.setUsedCount(0);

        coupon.setActive(true);

        Coupon saved = couponRepository.save(coupon);

        return convertToResponse(saved);
    }

    @Override
    public CouponResponseDto getById(Long id) {

        Coupon coupon = couponRepository.findById(id).orElseThrow(() ->
                new NotFoundException("Coupon not found"));
        return convertToResponse(coupon);
    }

    @Override
    public List<CouponResponseDto> getAll() {

        return couponRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public CouponResponseDto update(Long id, CouponRequestDto dto) {

        Coupon coupon = couponRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Coupon not found"));
        coupon.setCode(dto.getCode());
        coupon.setDescription(dto.getDescription());
        coupon.setType(dto.getType());
        coupon.setDiscountValue(dto.getDiscountValue());
        coupon.setMinimumAmount(dto.getMinimumAmount());
        coupon.setUsageLimit(dto.getUsageLimit());
        coupon.setStartDate(dto.getStartDate());
        coupon.setEndDate(dto.getEndDate());

        Coupon updated = couponRepository.save(coupon);
        return convertToResponse(updated);
    }

    @Override
    public boolean delete(Long id) {

        Coupon coupon = couponRepository.findById(id).orElseThrow(() ->
                new NotFoundException("Coupon not found"));

        couponRepository.delete(coupon);

        return true;
    }

    @Override
    public Coupon validateCoupon(String couponCode, BigDecimal totalPrice) {

        Coupon coupon = couponRepository.findByCode(couponCode)
                .orElseThrow(() ->
                        new NotFoundException("Coupon not found"));

        if (!coupon.getActive()) {

            throw new BusinessExcepiton("Coupon is not active");
        }

        LocalDateTime now = LocalDateTime.now();

        if (now.isBefore(coupon.getStartDate())) {

            throw new BusinessExcepiton("Coupon has not started yet");
        }

        if (now.isAfter(coupon.getEndDate())) {

            throw new BusinessExcepiton("Coupon has expired");
        }

        if (totalPrice.compareTo(coupon.getMinimumAmount()) < 0) {

            throw new BusinessExcepiton("Minimum order amount is " + coupon.getMinimumAmount());
        }

        if (coupon.getUsedCount() >= coupon.getUsageLimit()) {

            throw new BusinessExcepiton("Coupon usage limit reached");
        }

        return coupon;
    }



}
