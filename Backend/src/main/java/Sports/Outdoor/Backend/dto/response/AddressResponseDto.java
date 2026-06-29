package Sports.Outdoor.Backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressResponseDto {
    private Long id;

    private String city;

    private String district;

    private String fullAddress;

    private String postalCode;

    private Long userId;

    private String userEmail;

}
