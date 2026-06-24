package Sports.Outdoor.Backend.service.userService;

import Sports.Outdoor.Backend.dto.request.UserRequestDto;
import Sports.Outdoor.Backend.dto.response.UserResponseDto;
import Sports.Outdoor.Backend.entity.User;
import Sports.Outdoor.Backend.enums.Role;
import Sports.Outdoor.Backend.exception.BusinessExcepiton;
import Sports.Outdoor.Backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    @Override
    public UserResponseDto register(UserRequestDto dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new BusinessExcepiton("Bu Email Kaydı Mevcuttur");
        }

        User user = new User();

        user.setFirstName(dto.getFirstName());

        user.setLastName(dto.getLastName());

        user.setEmail(dto.getEmail());

        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        user.setRole(Role.CUSTOMER);

        User saved = userRepository.save(user);

        UserResponseDto response = new UserResponseDto();

        response.setId(saved.getId());
        response.setFirstName(saved.getFirstName());

        response.setLastName(saved.getLastName());

        response.setEmail(saved.getEmail());

        response.setRole(saved.getRole());

        return response;
    }

    @Override
    public UserResponseDto getCurrentUser(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new BusinessExcepiton("Kullanıcı Bulunamadı"));

        UserResponseDto dto = new UserResponseDto();

        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());

        return dto;
    }
}
