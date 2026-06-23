package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.ProductRequestDto;
import Sports.Outdoor.Backend.dto.response.ProductResponseDto;
import Sports.Outdoor.Backend.service.productService.ProductService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    @PostMapping("/create")
    public ProductResponseDto create(@Valid @RequestBody ProductRequestDto dto){
        ProductResponseDto productResponseDto=productService.create(dto);
        return productResponseDto;
    }

    @GetMapping("/getById/{id}")
    public ProductResponseDto getById(@PathVariable Long id){
        ProductResponseDto productResponseDto=productService.getById(id);
        return productResponseDto;
    }
    @GetMapping("/getAll")
    public List<ProductResponseDto>getAll(){
        List<ProductResponseDto>productResponseDtos=productService.getAll();
        return productResponseDtos;
    }
    @PutMapping("/update/{id}")
    public ProductResponseDto update(@PathVariable Long id,@Valid @RequestBody ProductRequestDto dto){
        ProductResponseDto productResponseDto=productService.update(id,dto);
        return productResponseDto;
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object>delete(@PathVariable Long id){
        Boolean delete=productService.delete(id);
        if(delete==true){
            return ResponseEntity.ok("Silme İşlemi Başarılı");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Silme İşlemi Başarısız");
    }
}
