package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.CouponRequestDto;
import Sports.Outdoor.Backend.dto.response.CouponResponseDto;
import Sports.Outdoor.Backend.service.couponService.CouponService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coupons")
public class CouponController {

    private final CouponService couponService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/create")
    public CouponResponseDto create(@Valid @RequestBody CouponRequestDto dto) {
        return couponService.create(dto);
    }

    @GetMapping("/getById/{id}")
    public CouponResponseDto getById(@PathVariable Long id) {
        return couponService.getById(id);
    }

    @GetMapping("/getAll")
    public List<CouponResponseDto> getAll() {
        return couponService.getAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update/{id}")
    public CouponResponseDto update(@PathVariable Long id, @Valid @RequestBody CouponRequestDto dto) {
        return couponService.update(id, dto);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {

        boolean deleted = couponService.delete(id);

        if (deleted) {
            return ResponseEntity.ok("Silme İşlemi Başarılı");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Silme İşlemi Başarısız");
    }
}
