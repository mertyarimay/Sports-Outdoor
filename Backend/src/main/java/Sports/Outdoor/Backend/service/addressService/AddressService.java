package Sports.Outdoor.Backend.service.addressService;

import Sports.Outdoor.Backend.dto.request.AddressRequestDto;
import Sports.Outdoor.Backend.dto.response.AddressResponseDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface AddressService {
    AddressResponseDto create(AddressRequestDto dto, Authentication authentication);

    List<AddressResponseDto> getMyAddresses(Authentication authentication);

    AddressResponseDto update(Long id, AddressRequestDto dto, Authentication authentication);

    void delete(Long id, Authentication authentication);
}
