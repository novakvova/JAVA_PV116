package org.example.entities;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserRolePK implements Serializable {
    private UserEntity user;
    private RoleEntity role;
}

