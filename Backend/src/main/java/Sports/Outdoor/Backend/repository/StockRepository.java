package Sports.Outdoor.Backend.repository;

import Sports.Outdoor.Backend.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock,Long> {
    Optional<Stock> findByVariantId(Long variantId);
    boolean existsByVariantId(Long variantId);
}
