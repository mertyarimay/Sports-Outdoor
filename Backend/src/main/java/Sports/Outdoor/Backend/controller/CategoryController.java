package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.CategoryRequestDto;
import Sports.Outdoor.Backend.dto.response.CategoryResponseDto;
import Sports.Outdoor.Backend.service.categoryService.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")

public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("/create")
    public CategoryResponseDto create(@Valid @RequestBody CategoryRequestDto dto) {
        return categoryService.create(dto);
    }

    @GetMapping("/getById/{id}")
    public CategoryResponseDto getById(@PathVariable Long id){
        return categoryService.getById(id);
    }

    @GetMapping("/getAll")
    public List<CategoryResponseDto>getAll(){
        List<CategoryResponseDto>categoryResponseDtoList=categoryService.getAll();
        return categoryResponseDtoList;
    }

    @PutMapping("/update/{id}")
    public CategoryResponseDto update(@Valid @RequestBody CategoryRequestDto categoryRequestDto,@PathVariable Long id){
        CategoryResponseDto categoryResponseDto=categoryService.update(id,categoryRequestDto);
        return categoryResponseDto;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object>delete(@PathVariable Long id){
        Boolean delete=categoryService.delete(id);
        if(delete==true){
            return ResponseEntity.ok("Silme İşlemi Başarılı");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Silme İşlemi Başarısız");
    }






}
