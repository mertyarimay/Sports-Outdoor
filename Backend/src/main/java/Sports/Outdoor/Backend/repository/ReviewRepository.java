package Sports.Outdoor.Backend.repository;

import Sports.Outdoor.Backend.entity.Payment;
import Sports.Outdoor.Backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ReviewRepository extends JpaRepository<Payment,Long> {

    List<Review> findByProductId(Long productId);

    List<Review> findByUserId(Long userId);
}
