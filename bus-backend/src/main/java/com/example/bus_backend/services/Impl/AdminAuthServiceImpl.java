package com.example.bus_backend.services.Impl;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder; // Add this!

import com.example.bus_backend.models.Admin;
import com.example.bus_backend.repositories.AdminRepository;
import com.example.bus_backend.Security.JwtUtil;
import com.example.bus_backend.services.AdminAuthService;

@Service
public class AdminAuthServiceImpl implements AdminAuthService {
    private final AdminRepository adminRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AdminAuthServiceImpl(AdminRepository adminRepository,
            JwtUtil jwtUtil,
            PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String register(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        adminRepository.save(admin);
        return "Admin Registered Successfully!";
    }

    @Override
    public String login(String username, String password) {
        Admin admin = adminRepository.findByUsername(username);

        if (admin == null || !passwordEncoder.matches(password, admin.getPassword())) {
            return "Invalid username or password!";
        }

        return jwtUtil.generateToken(username, admin.getRole());
    }
}