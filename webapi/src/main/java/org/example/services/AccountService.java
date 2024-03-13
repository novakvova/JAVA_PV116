package org.example.services;

import lombok.RequiredArgsConstructor;
import org.example.configuration.security.JwtService;
import org.example.constants.Roles;
import org.example.dto.account.AuthResponseDto;
import org.example.dto.account.LoginDto;
import org.example.dto.account.RegisterDTO;
import org.example.entities.UserEntity;
import org.example.entities.UserRoleEntity;
import org.example.repositories.RoleRepository;
import org.example.repositories.UserRepository;
import org.example.repositories.UserRoleRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponseDto login(LoginDto request) {
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var isValid = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if(!isValid) {
            throw new UsernameNotFoundException("User not found");
        }
        var jwtToekn = jwtService.generateAccessToken(user);
        return AuthResponseDto.builder()
                .token(jwtToekn)
                .build();
    }

    public AuthResponseDto register(RegisterDTO request) {
        // Check if the email is already registered
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already registered");
        }

        // Create a new user entity and set its properties
        var user = UserEntity
                .builder()
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        userRepository.save(user);
        var role = roleRepository.findByName(Roles.User);
        var ur = UserRoleEntity
                .builder()
                .role(role)
                .user(user)
                .build();
        userRoleRepository.save(ur);
        // Generate an access token for the new user
        var jwtToken = jwtService.generateAccessToken(user);

        return AuthResponseDto.builder()
                .token(jwtToken)
                .build();
    }
}
