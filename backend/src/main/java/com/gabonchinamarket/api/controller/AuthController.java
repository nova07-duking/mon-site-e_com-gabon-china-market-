package com.gabonchinamarket.api.controller;

import com.gabonchinamarket.api.model.Role;
import com.gabonchinamarket.api.model.SellerType;
import com.gabonchinamarket.api.model.User;
import com.gabonchinamarket.api.repository.RoleRepository;
import com.gabonchinamarket.api.repository.UserRepository;
import com.gabonchinamarket.api.security.jwt.JwtUtils;
import com.gabonchinamarket.api.security.services.UserDetailsImpl;
import com.gabonchinamarket.api.service.EmailService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;
    
    @Autowired
    EmailService emailService;
    
    @Value("${gcm.app.backendUrl:http://localhost:8080}")
    private String backendUrl;

    @Value("${gcm.app.frontendUrl:http://localhost}")
    private String frontendUrl;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            return ResponseEntity.ok(new JwtResponse(jwt, 
                                                     userDetails.getId(), 
                                                     userDetails.getUsername(), 
                                                     userDetails.getEmail(), 
                                                     roles));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new MessageResponse("Erreur : Identifiants incorrects ou compte non vérifié."));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erreur : Ce nom d'utilisateur est déjà pris !"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erreur : Cet email est déjà utilisé !"));
        }

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        
        if(signUpRequest.getSellerType() != null && !signUpRequest.getSellerType().isEmpty()) {
            user.setSellerType(SellerType.valueOf(signUpRequest.getSellerType().toUpperCase()));
        }

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName("ROLE_ACHETEUR")
                .orElseThrow(() -> new RuntimeException("Erreur : Le rôle n'a pas été trouvé."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                case "admin":
                case "ADMIN":
                    Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElseThrow();
                    roles.add(adminRole);
                    break;
                case "vendeur":
                case "VENDEUR":
                    Role sellerRole = roleRepository.findByName("ROLE_VENDEUR").orElseThrow();
                    roles.add(sellerRole);
                    break;
                default:
                    Role userRole = roleRepository.findByName("ROLE_ACHETEUR").orElseThrow();
                    roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        user.setCreatedAt(LocalDateTime.now());
        
        // Configuration de la vérification email
        String vCode = UUID.randomUUID().toString();
        user.setVerificationCode(vCode);
        user.setEnabled(false); // Le compte est désactivé jusqu'à la vérification
        
        userRepository.save(user);

        // Envoi du mail
        try {
            // URL de vérification dynamique
            String verifyUrl = backendUrl + "/api/auth/verify?code=" + vCode;
            String message = "Bonjour " + user.getUsername() + ",\n\n"
                    + "Merci de vous être inscrit sur GCMarket.\n"
                    + "Pour activer votre compte, veuillez cliquer sur le lien suivant :\n"
                    + verifyUrl + "\n\n"
                    + "À bientôt sur GCMarket !";
            emailService.sendEmail(user.getEmail(), "Confirmez votre inscription GCMarket", message);
        } catch (Exception e) {
            System.err.println("Erreur lors de l'envoi de l'email : " + e.getMessage());
        }

        return ResponseEntity.ok(new MessageResponse("Compte créé avec succès ! Veuillez vérifier votre adresse email pour l'activer."));
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestParam("code") String code) {
        User user = userRepository.findByVerificationCode(code).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("Erreur : Code de validation invalide ou expiré.");
        }
        user.setEnabled(true);
        user.setVerificationCode(null);
        userRepository.save(user);
        
        // Pour un usage réel, on pourrait faire un redirect HTTP vers index.html avec Javascript
        return ResponseEntity.ok("Compte vérifié avec succès ! Vous pouvez maintenant fermer cette page et vous connecter sur GCMarket.");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest req) {
        User user = userRepository.findByEmail(req.getEmail()).orElse(null);
        if (user == null) {
            // Sécurité : on ne précise pas si l'email existe ou non aux attaquants
            return ResponseEntity.ok(new MessageResponse("Si cet email existe dans notre système, un lien de réinitialisation vous a été envoyé."));
        }
        
        String token = UUID.randomUUID().toString();
        user.setResetPasswordToken(token);
        user.setResetPasswordTokenExpiry(LocalDateTime.now().plusHours(1)); // 1 heure de validité
        userRepository.save(user);

        // URL de réinitialisation dynamique
        String resetUrl = frontendUrl + "/reset-password.html?token=" + token;
        String message = "Bonjour " + user.getUsername() + ",\n\n"
                + "Vous avez demandé à réinitialiser votre mot de passe.\n"
                + "Cliquez sur ce lien pour changer de mot de passe :\n"
                + resetUrl + "\n\n"
                + "Ce lien expire dans 1 heure.";
                
        try {
            emailService.sendEmail(user.getEmail(), "Réinitialisation de mot de passe GCMarket", message);
        } catch(Exception e) {
            System.err.println("Erreur lors de l'envoi du mail de réinitialisation : " + e.getMessage());
        }

        return ResponseEntity.ok(new MessageResponse("Si cet email existe dans notre système, un lien de réinitialisation vous a été envoyé."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest req) {
        User user = userRepository.findByResetPasswordToken(req.getToken()).orElse(null);
        if (user == null || user.getResetPasswordTokenExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erreur : Lien invalide ou expiré."));
        }
        
        user.setPassword(encoder.encode(req.getNewPassword()));
        user.setResetPasswordToken(null);
        user.setResetPasswordTokenExpiry(null);
        userRepository.save(user);
        
        return ResponseEntity.ok(new MessageResponse("Mot de passe modifié avec succès !"));
    }
}

@Data
class LoginRequest {
    private String username;
    private String password;
}

@Data
class SignupRequest {
    private String username;
    private String email;
    private String password;
    private Set<String> role;
    private String sellerType;
}

@Data
class ForgotPasswordRequest {
    private String email;
}

@Data
class ResetPasswordRequest {
    private String token;
    private String newPassword;
}

@Data
class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> roles;

    public JwtResponse(String accessToken, Long id, String username, String email, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }
}

@Data
class MessageResponse {
    private String message;
    public MessageResponse(String message) { this.message = message; }
}
