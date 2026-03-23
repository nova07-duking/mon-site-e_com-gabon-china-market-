package com.gabonchinamarket.api.security;

import com.gabonchinamarket.api.model.Role;
import com.gabonchinamarket.api.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initRoles(RoleRepository roleRepository) {
        return args -> {
            // Uniquement si la table est complètement vide, on insère les rôles obligatoires
            if (roleRepository.count() == 0) {
                roleRepository.saveAll(Arrays.asList(
                    new Role(null, "ROLE_ADMIN"),
                    new Role(null, "ROLE_VENDEUR"),
                    new Role(null, "ROLE_ACHETEUR")
                ));
            }
        };
    }
}
