package com.gabonchinamarket.api.security;

import com.gabonchinamarket.api.model.Role;
import com.gabonchinamarket.api.model.User;
import com.gabonchinamarket.api.repository.RoleRepository;
import com.gabonchinamarket.api.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initData(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Initialisation des rôles
            if (roleRepository.count() == 0) {
                roleRepository.saveAll(Arrays.asList(
                    new Role(null, "ROLE_ADMIN"),
                    new Role(null, "ROLE_VENDEUR"),
                    new Role(null, "ROLE_ACHETEUR")
                ));
            }

            // Initialisation de l'Admin par défaut
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@gcm.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setEnabled(true);
                
                Role adminRole = roleRepository.findAll().stream()
                        .filter(r -> r.getName().equals("ROLE_ADMIN"))
                        .findFirst()
                        .orElse(null);
                
                if (adminRole != null) {
                    admin.getRoles().add(adminRole);
                }
                
                userRepository.save(admin);
                System.out.println("Compte admin par défaut créé (admin / admin123)");
            }
        };
    }
}
