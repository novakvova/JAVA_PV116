package org.example.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tbl_user_roles")
@IdClass(UserRolePK.class)
public class UserRoleEntity {
    @Id
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id", nullable = false)
    private UserEntity user;
    @Id
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="role_id", nullable = false)
    private RoleEntity role;
}
