package Sports.Outdoor.Backend.repository;

import Sports.Outdoor.Backend.entity.CouponUsageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponUsageRepository extends JpaRepository<CouponUsageEntity,Long> {

    boolean existsByUserIdAndCouponId(Long userId, Long couponId);
}
