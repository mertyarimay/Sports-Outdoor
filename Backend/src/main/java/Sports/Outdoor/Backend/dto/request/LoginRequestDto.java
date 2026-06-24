package Sports.Outdoor.Backend.dto.request;


import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginRequestDto {
    @Email
    private String email;

    private String password;
}
