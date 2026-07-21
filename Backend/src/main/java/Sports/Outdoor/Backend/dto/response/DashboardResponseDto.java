package Sports.Outdoor.Backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponseDto {
    private Long totalUsers;

    private Long totalProducts;

    private Long totalOrders;

    private Long totalReviews;

    private Long totalBrands;

    private Long totalCategories;

    private BigDecimal totalRevenue;
}
