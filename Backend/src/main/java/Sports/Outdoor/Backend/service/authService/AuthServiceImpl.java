package Sports.Outdoor.Backend.service.authService;

import Sports.Outdoor.Backend.dto.request.LoginRequestDto;
import Sports.Outdoor.Backend.dto.response.AuthResponseDto;
import Sports.Outdoor.Backend.entity.User;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.repository.UserRepository;
import Sports.Outdoor.Backend.security.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements  AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;


    @Override
    public AuthResponseDto login(LoginRequestDto dto) {

        authenticationManager.authenticate
                (new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );

        User user = userRepository.findByEmail(dto.getEmail()).orElse(null);
        if(user==null){
            throw new NotFoundException("Bu Emaile Ait Kayıt Bulunamadı");
        }

        String token = jwtService.generateToken(user);

        return new AuthResponseDto(token);
    }

}
