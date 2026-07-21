package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.StockRequestDto;
import Sports.Outdoor.Backend.dto.response.StockResponseDto;
import Sports.Outdoor.Backend.service.stockService.StockService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/stocks")
public class StockController {

    private final StockService stockService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/create")
    public StockResponseDto create(@Valid @RequestBody StockRequestDto dto) {
        return stockService.create(dto);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/getById/{id}")
    public StockResponseDto getById(@PathVariable Long id) {
        return stockService.getById(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/getAll")
    public List<StockResponseDto> getAll() {
        return stockService.getAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update/{id}")
    public StockResponseDto update(@PathVariable Long id, @Valid @RequestBody StockRequestDto dto) {
        return stockService.update(id, dto);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        boolean delete = stockService.delete(id);

        if (delete) {
            return ResponseEntity.ok("Silme İşlemi Başarılı");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Silme İşlemi Başarısız");
    }
}