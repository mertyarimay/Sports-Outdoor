package Sports.Outdoor.Backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BrandResponseDto {
    private Long id;

    private String name;

    private String logoUrl;

    private String description;
}
