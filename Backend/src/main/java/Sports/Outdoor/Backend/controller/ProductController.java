package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.ProductRequestDto;
import Sports.Outdoor.Backend.dto.response.ProductResponseDto;
import Sports.Outdoor.Backend.service.productService.ProductService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/create")
    public ProductResponseDto create(@Valid @RequestBody ProductRequestDto dto) {
        return productService.create(dto);
    }

    @GetMapping("/getById/{id}")
    public ProductResponseDto getById(@PathVariable Long id) {
        return productService.getById(id);
    }

    @GetMapping("/getAll")
    public List<ProductResponseDto> getAll() {
        return productService.getAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update/{id}")
    public ProductResponseDto update(@PathVariable Long id, @Valid @RequestBody ProductRequestDto dto) {
        return productService.update(id, dto);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        Boolean delete = productService.delete(id);

        if (delete) {
            return ResponseEntity.ok("Silme İşlemi Başarılı");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Silme İşlemi Başarısız");
    }

}