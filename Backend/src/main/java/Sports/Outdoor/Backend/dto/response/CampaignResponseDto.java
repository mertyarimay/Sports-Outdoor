package Sports.Outdoor.Backend.dto.response;

import jdk.jfr.Name;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CampaignResponseDto {
    private Long id;

    private String title;

    private Integer discountPercent;

    private LocalDate startDate;

    private LocalDate endDate;

}
