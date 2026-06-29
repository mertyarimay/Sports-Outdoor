package Sports.Outdoor.Backend.service.addressService;

import Sports.Outdoor.Backend.dto.request.AddressRequestDto;
import Sports.Outdoor.Backend.dto.response.AddressResponseDto;
import Sports.Outdoor.Backend.entity.Address;
import Sports.Outdoor.Backend.entity.User;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.AddressRepository;
import Sports.Outdoor.Backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AddressServiceImpl implements AddressService{
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @Override
    public AddressResponseDto create(AddressRequestDto dto, Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User Bulunamadı"));

        Address address = new Address();

        address.setCity(dto.getCity());
        address.setDistrict(dto.getDistrict());
        address.setFullAddress(dto.getFullAddress());
        address.setPostalCode(dto.getPostalCode());
        address.setUser(user);

        Address saved = addressRepository.save(address);

        return convertToResponse(saved);
    }

    @Override
    public List<AddressResponseDto> getMyAddresses(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User Bulunamadı"));

       List<Address>addresses=addressRepository.findByUserId(user.getId());
       List<AddressResponseDto>addressResponseDtos=addresses.stream().map(address -> convertToResponse(address)).collect(Collectors.toList());
       return addressResponseDtos;
    }

    @Override
    public AddressResponseDto update(Long id, AddressRequestDto dto, Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User Bulunamadı"));

        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Address Bulunamadı"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Bu Adresi Güncelleyemezssiniz");
        }

        address.setCity(dto.getCity());
        address.setDistrict(dto.getDistrict());
        address.setFullAddress(dto.getFullAddress());
        address.setPostalCode(dto.getPostalCode());

        Address updated = addressRepository.save(address);

        return convertToResponse(updated);
    }

    @Override
    public void delete(Long id, Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User Bulunamadı"));

        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Address Bulunamadı"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Bu Adresi Silemezssiniz.");
        }
        addressRepository.delete(address);
    }

    private AddressResponseDto convertToResponse(Address address) {

        AddressResponseDto dto = new AddressResponseDto();

        dto.setId(address.getId());
        dto.setCity(address.getCity());
        dto.setDistrict(address.getDistrict());
        dto.setFullAddress(address.getFullAddress());
        dto.setPostalCode(address.getPostalCode());

        dto.setUserId(address.getUser().getId());
        dto.setUserEmail(address.getUser().getEmail());

        return dto;
    }


}
