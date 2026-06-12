package Sports.Outdoor.Backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BrandRequestDto {

    @NotBlank(message = "Brand name cannot be empty")
    private String name;

    @NotBlank(message = "Logo url cannot be empty")
    private String logoUrl;

    private String description;
}
