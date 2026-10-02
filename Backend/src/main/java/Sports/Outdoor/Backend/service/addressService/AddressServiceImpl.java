package Sports.Outdoor.Backend.service.addressService;

import Sports.Outdoor.Backend.dto.request.AddressRequestDto;
import Sports.Outdoor.Backend.dto.response.AddressResponseDto;
import Sports.Outdoor.Backend.entity.Address;
import Sports.Outdoor.Backend.entity.User;
import Sports.Outdoor.Backend.exception.BusinessExcepiton;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.AddressRepository;
import Sports.Outdoor.Backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @Override
    public AddressResponseDto create(AddressRequestDto dto, Authentication authentication) {

        User user = getAuthenticatedUser(authentication);

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

        User user = getAuthenticatedUser(authentication);

        return addressRepository
                .findByUserId(user.getId())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public AddressResponseDto getById(Long id, Authentication authentication) {

        User user = getAuthenticatedUser(authentication);

        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Adres bulunamadı"));

        checkAddressOwnership(address, user);

        return convertToResponse(address);
    }

    @Override
    public AddressResponseDto update(Long id, AddressRequestDto dto, Authentication authentication) {

        User user = getAuthenticatedUser(authentication);

        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Adres bulunamadı"));

        checkAddressOwnership(address, user);

        address.setCity(dto.getCity());
        address.setDistrict(dto.getDistrict());
        address.setFullAddress(dto.getFullAddress());
        address.setPostalCode(dto.getPostalCode());

        Address updated = addressRepository.save(address);

        return convertToResponse(updated);
    }

    @Override
    public Boolean delete(Long id, Authentication authentication) {

        User user = getAuthenticatedUser(authentication);

        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Adres bulunamadı"));

        checkAddressOwnership(address, user);

        addressRepository.delete(address);

        return !addressRepository.existsById(id);
    }

    private User getAuthenticatedUser(Authentication authentication) {

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new BusinessExcepiton("Kullanıcı bulunamadı"));
    }

    private void checkAddressOwnership(Address address, User user) {

        if (!address.getUser().getId().equals(user.getId())) {

            throw new BusinessExcepiton("Bu adrese erişim yetkiniz yok");
        }
    }

    private AddressResponseDto convertToResponse(Address address) {

        AddressResponseDto response = new AddressResponseDto();
        response.setId(address.getId());
        response.setCity(address.getCity());
        response.setDistrict(address.getDistrict());
        response.setFullAddress(address.getFullAddress());
        response.setPostalCode(address.getPostalCode());
        response.setUserId(address.getUser().getId());

        return response;
    }
}