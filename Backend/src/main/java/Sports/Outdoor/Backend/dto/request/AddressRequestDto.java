package Sports.Outdoor.Backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressRequestDto {
    @NotBlank(message = "City cannot be empty")
    private String city;

    @NotBlank(message = "District cannot be empty")
    private String district;

    @NotBlank(message = "Full address cannot be empty")
    private String fullAddress;

    @NotBlank(message = "Postal code cannot be empty")
    private String postalCode;
}
