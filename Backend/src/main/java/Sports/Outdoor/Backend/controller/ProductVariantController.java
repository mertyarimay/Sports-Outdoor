package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.ProductVariantRequestDto;
import Sports.Outdoor.Backend.dto.response.ProductVariantResponseDto;
import Sports.Outdoor.Backend.service.productVariantService.ProductVariantService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/product-variants")
public class ProductVariantController {
    private final ProductVariantService productVariantService;
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/create")
    public ProductVariantResponseDto create(@Valid @RequestBody ProductVariantRequestDto dto){
        ProductVariantResponseDto productVariantResponseDto=productVariantService.create(dto);
        return productVariantResponseDto;
    }

    @GetMapping("/getById/{id}")
    public ProductVariantResponseDto getById(@PathVariable Long id){
        ProductVariantResponseDto productVariantResponseDto=productVariantService.getById(id);
        return productVariantResponseDto;
    }
    @GetMapping("/getAll")
    public List<ProductVariantResponseDto>productVariantResponseDtos(){
        List<ProductVariantResponseDto>productVariantResponseDtos=productVariantService.getAll();
        return productVariantResponseDtos;

    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update/{id}")
    public ProductVariantResponseDto update(@Valid @RequestBody ProductVariantRequestDto dto,@PathVariable Long id){
        ProductVariantResponseDto productVariantResponseDto=productVariantService.update(id,dto);
        return productVariantResponseDto;
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object>delete(@PathVariable Long id){
        boolean delete=productVariantService.delete(id);
        if(delete==true){
            return  ResponseEntity.ok("Silme İşlemi Başarılı");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Silme İşlemi Başarısız");
    }

}
