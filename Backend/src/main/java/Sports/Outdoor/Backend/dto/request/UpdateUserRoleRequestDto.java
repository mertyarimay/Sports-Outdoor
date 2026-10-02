package Sports.Outdoor.Backend.dto.request;

import Sports.Outdoor.Backend.enums.Role;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateUserRoleRequestDto {
    @NotNull
    private Role role;
}
