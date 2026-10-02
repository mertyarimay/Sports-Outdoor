package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.AddressRequestDto;
import Sports.Outdoor.Backend.dto.response.AddressResponseDto;
import Sports.Outdoor.Backend.service.addressService.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @PostMapping("/create")
    public AddressResponseDto create(@Valid @RequestBody AddressRequestDto dto, Authentication authentication) {
        return addressService.create(dto, authentication);
    }

    @GetMapping("/my")
    public List<AddressResponseDto> getMyAddresses(Authentication authentication) {
        return addressService.getMyAddresses(authentication);
    }

    @GetMapping("/{id}")
    public AddressResponseDto getById(@PathVariable Long id, Authentication authentication) {
        return addressService.getById(id, authentication);
    }

    @PutMapping("/{id}")
    public AddressResponseDto update(@PathVariable Long id, @Valid @RequestBody AddressRequestDto dto, Authentication authentication) {
        return addressService.update(id, dto, authentication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id, Authentication authentication) {
        Boolean deleted = addressService.delete(id, authentication);

        if (deleted) {
            return ResponseEntity.ok("Adres silme işlemi başarılı");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Adres silinemedi");
    }
}