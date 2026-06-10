package Sports.Outdoor.Backend.repository;

import Sports.Outdoor.Backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    Optional<Product>findBySlug(String slug);
    List<Product>findByCategoryId(Long categoryId);
    List<Product> findByBrandId(Long brandId);
    List<Product> findByActiveTrue();

    Page<Product> findByNameContainingIgnoreCase(    //product ın içinde geçen kelimelere göre sayfalama getirme
            String keyword,
            Pageable pageable
    );
}
