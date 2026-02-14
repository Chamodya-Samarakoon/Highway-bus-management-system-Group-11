package com.example.bus_backend.controllers;

import com.example.bus_backend.models.User;
import com.example.bus_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = "*")
public class DriverController {

    @Autowired 
    private UserRepository userRepository;

    // GET: http://localhost:8080/api/drivers
    @GetMapping
    public List<User> getAllDrivers() {
        return userRepository.findAll().stream()
                .filter(user -> "DRIVER".equalsIgnoreCase(user.getRole()))
                .collect(Collectors.toList());
    }

    // GET: http://localhost:8080/api/drivers/all
    @GetMapping("/all")
    public List<User> listDrivers() {
        return getAllDrivers(); // Reuse the logic above
    }
}