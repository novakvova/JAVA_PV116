package org.example.repositories;

import org.example.entities.UserEntity;
import org.example.entities.UserRoleEntity;
import org.example.entities.UserRolePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRoleEntity, UserRolePK> {
    List<UserRoleEntity> findByUser(UserEntity user);
}