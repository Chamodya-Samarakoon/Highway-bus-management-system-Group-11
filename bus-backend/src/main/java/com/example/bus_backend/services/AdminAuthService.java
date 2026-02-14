package com.example.bus_backend.services;

import com.example.bus_backend.models.Admin;

public interface AdminAuthService {
    String register(Admin admin);
    String login(String username, String password);
    
}
