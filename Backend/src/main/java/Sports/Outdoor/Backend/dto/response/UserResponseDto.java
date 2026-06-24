package Sports.Outdoor.Backend.dto.response;

import Sports.Outdoor.Backend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private Role role;
}
