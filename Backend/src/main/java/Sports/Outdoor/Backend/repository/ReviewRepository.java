package Sports.Outdoor.Backend.repository;


import Sports.Outdoor.Backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {

    List<Review> findByUserId(Long userId); //kullanıcının kendi yorumları

    List<Review> findByProductIdOrderByCreatedAtDesc(Long productId);//bir ürünün bütün yorumları

    Optional<Review> findByUserIdAndProductId(Long userId, Long productId); //aynı ürüne 2 .yorum

    boolean existsByUserIdAndProductId(Long userId, Long productId);//user aynı ürüne bir kere yorum yapsın

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.product.id = :productId")   //ortalama puan
    Double findAverageRatingByProductId(Long productId);

    Long countByProductId(Long productId); //toplam yorum



}
