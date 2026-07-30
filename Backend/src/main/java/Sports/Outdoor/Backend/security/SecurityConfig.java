package Sports.Outdoor.Backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        // Authentication
                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()

                        // Product
                        .requestMatchers(
                                "/api/products/getAll",
                                "/api/products/getById/**"
                        ).permitAll()
                        // Product Variant
                        .requestMatchers(
                                "/api/product-variants/getAll",
                                "/api/product-variants/getById/**"
                        ).permitAll()
                        .requestMatchers(
                                "/api/product-images/getAll",
                                "/api/product-images/getById/**"
                        ).permitAll()
                        // Category
                        .requestMatchers(
                                "/api/categories/getAll",
                                "/api/categories/getById/**"
                        ).permitAll()

                        // Brand
                        .requestMatchers(
                                "/api/brands/getAll",
                                "/api/brands/getById/**"
                        ).permitAll()

                        // Campaign
                        .requestMatchers(
                                "/api/campaigns/getAll",
                                "/api/campaigns/getById/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/reviews/product/*",
                                "/api/reviews/product/*/average-rating",
                                "/api/reviews/product/*/review-count"
                        ).permitAll()

                        // Swagger
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        ).permitAll()

                        // Diğer tüm endpointler giriş ister
                        .anyRequest().authenticated()
                )

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                )

                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {

        return config.getAuthenticationManager();
    }
}