package Sports.Outdoor.Backend.service.dashboardService;

import Sports.Outdoor.Backend.dto.response.DashboardResponseDto;
import Sports.Outdoor.Backend.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final OrderRepository orderRepository;

    private final ReviewRepository reviewRepository;

    private final BrandRepository brandRepository;

    private final CategoryRepository categoryRepository;



    @Override
    public DashboardResponseDto getDashboard() {

        DashboardResponseDto dto = new DashboardResponseDto();

        dto.setTotalUsers(userRepository.count());

        dto.setTotalProducts(productRepository.count());

        dto.setTotalOrders(orderRepository.count());

        dto.setTotalReviews(reviewRepository.count());

        dto.setTotalBrands(brandRepository.count());

        dto.setTotalCategories(categoryRepository.count());

        dto.setTotalRevenue(orderRepository.getTotalRevenue());

        return dto;
    }
}
