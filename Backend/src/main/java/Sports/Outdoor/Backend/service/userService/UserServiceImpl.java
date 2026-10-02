package Sports.Outdoor.Backend.service.userService;

import Sports.Outdoor.Backend.dto.request.UpdateUserRoleRequestDto;
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

import java.util.List;

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
        user.setActive(true);

        User saved = userRepository.save(user);

        UserResponseDto response = new UserResponseDto();

        response.setId(saved.getId());
        response.setFirstName(saved.getFirstName());

        response.setLastName(saved.getLastName());

        response.setEmail(saved.getEmail());

        response.setRole(saved.getRole());

        response.setActive(saved.getActive());

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
        dto.setActive(user.getActive());

        return dto;
    }

    @Override
    public List<UserResponseDto> getAllUsers() {

        List<User> users = userRepository.findAll();

        return users.stream().map(user -> {
            UserResponseDto dto = new UserResponseDto();
            dto.setId(user.getId());
            dto.setFirstName(user.getFirstName());
            dto.setLastName(user.getLastName());
            dto.setEmail(user.getEmail());
            dto.setRole(user.getRole());
            dto.setActive(user.getActive());
            return dto;}).toList();
    }

    @Override
    public UserResponseDto getUserById(Long id) {

        User user = userRepository.findById(id).orElseThrow(() ->
                new BusinessExcepiton("Kullanıcı Bulunamadı"));

        UserResponseDto dto = new UserResponseDto();

        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setActive(user.getActive());
        return dto;
    }
    @Override
    public UserResponseDto updateUserRole(Long id, UpdateUserRoleRequestDto dto) {

        User user = userRepository.findById(id).orElseThrow(() ->
                        new BusinessExcepiton("Kullanıcı Bulunamadı"));

        user.setRole(dto.getRole());

        User updated = userRepository.save(user);

        UserResponseDto response = new UserResponseDto();

        response.setId(updated.getId());
        response.setFirstName(updated.getFirstName());
        response.setLastName(updated.getLastName());
        response.setEmail(updated.getEmail());
        response.setRole(updated.getRole());
        return response;
    }
    @Override
    public Boolean deleteUser(Long id) {

        User user = userRepository.findById(id).orElseThrow(() ->
                new BusinessExcepiton("Kullanıcı Bulunamadı"));

        userRepository.delete(user);
        return !userRepository.existsById(id);
    }
    @Override
    public UserResponseDto updateUserActive(Long id, Boolean active) {

        User user = userRepository.findById(id).orElseThrow(() ->
                        new BusinessExcepiton("Kullanıcı Bulunamadı"));

        user.setActive(active);

        User updated = userRepository.save(user);

        UserResponseDto response = new UserResponseDto();

        response.setId(updated.getId());
        response.setFirstName(updated.getFirstName());
        response.setLastName(updated.getLastName());
        response.setEmail(updated.getEmail());
        response.setRole(updated.getRole());
        response.setActive(updated.getActive());

        return response;
    }
}
