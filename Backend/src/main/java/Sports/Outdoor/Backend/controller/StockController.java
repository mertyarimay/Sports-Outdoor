package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.StockRequestDto;
import Sports.Outdoor.Backend.dto.response.StockResponseDto;
import Sports.Outdoor.Backend.service.stockService.StockService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/stocks")
public class StockController {
    private final StockService stockService;

    @PostMapping("/create")
    public StockResponseDto create(@Valid @RequestBody StockRequestDto dto){
        StockResponseDto stockResponseDto=stockService.create(dto);
        return  stockResponseDto;
    }
    @GetMapping("/getById/{id}")
    public StockResponseDto getById(@PathVariable Long id){
        StockResponseDto stockResponseDto=stockService.getById(id);
        return stockResponseDto;
    }
    @GetMapping("/getAll")
    public List<StockResponseDto>getAll(){
        List<StockResponseDto>stockResponseDtos=stockService.getAll();
        return stockResponseDtos;
    }
    @PutMapping("/update/{id}")
    public StockResponseDto update(@PathVariable Long id,@Valid @RequestBody StockRequestDto dto){
        StockResponseDto stockResponseDto=stockService.update(id,dto);
        return stockResponseDto;
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object>delete(@PathVariable Long id){
        boolean delete=stockService.delete(id);
        if(delete==true){
            return ResponseEntity.ok("Silme İşlemi Başarılı");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Silme İşlemi Başarısız");
    }
}
