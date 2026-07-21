package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.BrandRequestDto;
import Sports.Outdoor.Backend.dto.response.BrandResponseDto;
import Sports.Outdoor.Backend.service.brandService.BrandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/brands")
public class BrandController {

    private final BrandService brandService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/create")
    public BrandResponseDto create(@Valid @RequestBody BrandRequestDto dto) {
        return brandService.create(dto);
    }

    @GetMapping("/getById/{id}")
    public BrandResponseDto getById(@PathVariable Long id) {
        return brandService.getById(id);
    }

    @GetMapping("/getAll")
    public List<BrandResponseDto> getAll() {
        return brandService.getAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update/{id}")
    public BrandResponseDto update(@Valid @RequestBody BrandRequestDto dto, @PathVariable Long id) {

        return brandService.update(id, dto);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {

        Boolean delete = brandService.delete(id);

        if (delete) {
            return ResponseEntity.ok("Silme İşlemi Başarılı");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Silme İşlemi Başarısız");
    }
}