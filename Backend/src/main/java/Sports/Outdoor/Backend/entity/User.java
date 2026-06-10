package Sports.Outdoor.Backend.entity;

import Sports.Outdoor.Backend.enums.Role;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private  String email;
    private  String password;

    @Enumerated(EnumType.STRING)
    private Role role;

}
