package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.ProductImageRequestDto;
import Sports.Outdoor.Backend.dto.response.ProductImageResponseDto;
import Sports.Outdoor.Backend.service.productImageService.ProductImageService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("/api/product-images")
public class ProductImageController {
    private final ProductImageService productImageService;
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/create")
    public ProductImageResponseDto craete(@Valid @RequestBody ProductImageRequestDto dto){
        ProductImageResponseDto productImageResponseDto=productImageService.create(dto);
        return productImageResponseDto;
    }
    @GetMapping("/getById/{id}")
    public ProductImageResponseDto getById(@PathVariable Long id){
        ProductImageResponseDto productImageResponseDto=productImageService.getById(id);
        return productImageResponseDto;
    }
    @GetMapping("/getAll")
    public List<ProductImageResponseDto>getAll(){
        List<ProductImageResponseDto>productImageResponseDtos=productImageService.getAll();
        return productImageResponseDtos;
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update/{id}")
    public ProductImageResponseDto update(@PathVariable Long id,@Valid @RequestBody ProductImageRequestDto dto){
        ProductImageResponseDto productImageResponseDto=productImageService.update(id,dto);
        return productImageResponseDto;
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object>delete(@PathVariable Long id){
        boolean delete=productImageService.delete(id);
        if(delete==true){
            return ResponseEntity.ok("Silme İşlemi Başarılı");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Silme İşlemi Başarısız");
    }

}
