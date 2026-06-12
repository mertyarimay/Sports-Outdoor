package Sports.Outdoor.Backend.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CampaignRequestDto {
    @NotBlank(message = "Campaign title cannot be empty")
    private String title;

    @NotNull(message = "Discount percent cannot be null")
    @Min(value = 1, message = "Discount must be at least 1")
    @Max(value = 100, message = "Discount cannot exceed 100")
    private Integer discountPercent;

    @NotNull(message = "Start date cannot be null")
    private LocalDate startDate;

    @NotNull(message = "End date cannot be null")
    private LocalDate endDate;

}
