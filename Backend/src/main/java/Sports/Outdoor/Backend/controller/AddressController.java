package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.AddressRequestDto;
import Sports.Outdoor.Backend.dto.response.AddressResponseDto;
import Sports.Outdoor.Backend.service.addressService.AddressService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/addresses")
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

    @PutMapping("/update/{id}")
    public AddressResponseDto update(@PathVariable Long id, @Valid @RequestBody AddressRequestDto dto, Authentication authentication) {
        return addressService.update(id, dto, authentication);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id, Authentication authentication) {
        addressService.delete(id, authentication);
    }
}
