package com.example.bus_backend.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) 
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // 1. PUBLIC: Access for everyone (No token needed)
                .requestMatchers(
                    "/api/auth/**", 
                    "/api/passengers/register", 
                    "/api/passengers/login",
                    "/api/public/**" // For Announcements, Schedules, Routes
                ).permitAll()

                // 2. ADMIN ONLY: Infrastructure Management
                .requestMatchers(HttpMethod.POST, "/api/routes/**", "/api/schedules/**", "/api/buses/**", "/api/ticket-prices/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/routes/**", "/api/schedules/**", "/api/buses/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/routes/**", "/api/schedules/**", "/api/buses/**", "/api/feedback/**").hasRole("ADMIN")

                // 3. SECURE PASSENGER ACTIONS: (Requires any valid JWT)
                .requestMatchers("/api/bookings/**").authenticated()
                .requestMatchers("/api/payments/**").authenticated()
                .requestMatchers("/api/complaints/submit").authenticated()
                .requestMatchers("/api/feedback/submit").authenticated()

                // 4. STAFF/OPERATIONAL: (Drivers & Conductors)
                .requestMatchers("/api/conductor/**").hasAnyRole("ADMIN", "CONDUCTOR")
                .requestMatchers("/api/trips/**").hasAnyRole("ADMIN", "CONDUCTOR", "DRIVER")
                .requestMatchers("/api/issues/report").hasAnyRole("CONDUCTOR", "DRIVER")

                .anyRequest().authenticated()
            );

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}