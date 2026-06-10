package Sports.Outdoor.Backend.repository;

import Sports.Outdoor.Backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    Optional<Category>findBySlug(String slug);
    boolean existsBySlug(String slug);
}
