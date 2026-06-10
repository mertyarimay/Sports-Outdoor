package Sports.Outdoor.Backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequestDto {
    @NotBlank(message = "Category name cannot be empty")
    private String name;

    @NotBlank(message = "Slug cannot be empty")
    private String slug;
    private Long parentId;
}
