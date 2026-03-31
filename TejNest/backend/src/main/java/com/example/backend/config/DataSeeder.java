package com.example.backend.config;

import com.example.backend.entity.Designer;
import com.example.backend.entity.Portfolio;
import com.example.backend.entity.User;
import com.example.backend.repository.DesignerRepository;
import com.example.backend.repository.PortfolioRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, 
                                 DesignerRepository designerRepository, 
                                 PortfolioRepository portfolioRepository,
                                 PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed Designers
            seedDesigner(userRepository, designerRepository, portfolioRepository, passwordEncoder,
                    "alex_rivers", "Alex Rivers", "Modern Minimalist", 150,
                    "With over 10 years of experience in luxury residential design, I focus on creating spaces that are both beautiful and highly functional.",
                    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80");

            seedDesigner(userRepository, designerRepository, portfolioRepository, passwordEncoder,
                    "elena_monaco", "Elena Monaco", "Classic European", 180,
                    "Merging traditional European aesthetics with modern comfort. Specialized in luxury villas and heritage renovations.",
                    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80");

            seedDesigner(userRepository, designerRepository, portfolioRepository, passwordEncoder,
                    "kai_chen", "Kai Chen", "Zen Master", 120,
                    "Inspired by Eastern philosophy, I create balanced, tranquil environments that promote wellness and mindfulness.",
                    "https://images.unsplash.com/photo-1616489953149-8c20573e8633?auto=format&fit=crop&w=800&q=80");
        };
    }

    private void seedDesigner(UserRepository userRepository, 
                             DesignerRepository designerRepository, 
                             PortfolioRepository portfolioRepository,
                             PasswordEncoder passwordEncoder,
                             String username, String fullName, String style, int rate, String bio, String portfolioImg) {
        
        if (userRepository.existsByUsername(username)) return;

        User user = new User();
        user.setUsername(username);
        user.setEmail(username + "@example.com");
        user.setPassword(passwordEncoder.encode("password123"));
        user.setRole(User.Role.ROLE_DESIGNER);
        userRepository.save(user);

        Designer designer = new Designer();
        designer.setUser(user);
        designer.setStyle(style);
        designer.setBio(bio);
        designer.setHourlyRate((double) rate);
        designerRepository.save(designer);

        Portfolio p1 = new Portfolio();
        p1.setTitle(style + " Project");
        p1.setDescription("A signature representation of " + style + " aesthetics.");
        p1.setImageUrl(portfolioImg);
        p1.setDesigner(designer);
        portfolioRepository.save(p1);
    }
}
