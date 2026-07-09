package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.BrandRequestDto;
import Sports.Outdoor.Backend.dto.response.BrandResponseDto;
import Sports.Outdoor.Backend.service.brandService.BrandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/brands")
public class BrandController {
    private final BrandService brandService;

    @PostMapping("/create")
    public BrandResponseDto create(@Valid @RequestBody BrandRequestDto dto){
        BrandResponseDto brandResponseDto=brandService.create(dto);
        return brandResponseDto;
    }

    @GetMapping("/getById/{id}")
    public BrandResponseDto getById(@PathVariable Long id){
        BrandResponseDto brandResponseDto=brandService.getById(id);
        return brandResponseDto;
    }

    @GetMapping("/getAll")
    public List<BrandResponseDto>getAll(){
        List<BrandResponseDto>brandResponseDtoList=brandService.getAll();
        return brandResponseDtoList;
    }

    @PutMapping("/update/{id}")
    public BrandResponseDto update(@Valid @RequestBody BrandRequestDto dto,@PathVariable Long id){
        BrandResponseDto brandResponseDto=brandService.update(id,dto);
        return brandResponseDto;
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        Boolean delete=brandService.delete(id);
        if(delete==true){
          return   ResponseEntity.ok("Silme İşlemi Başarılı");
        }
        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("Silme İşlemi Başarısız");

    }




}
