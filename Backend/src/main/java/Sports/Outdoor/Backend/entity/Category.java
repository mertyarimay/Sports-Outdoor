package Sports.Outdoor.Backend.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Entity
@Table(name = "categories")
@Data

public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String slug; //okunabilir metin için Outdoor Ayakkabı yerine outdoor-ayakkabi bu gibi

    @ManyToOne (fetch = FetchType.LAZY)  //gerektiğinde veriler gelsin gerekmediğinde gelmesin sistemi zorlamasın diye lazy
    @JoinColumn(name = "parent_id") //kendi için de join örnek mont parent erkek gibi
    private Category parent;



}
