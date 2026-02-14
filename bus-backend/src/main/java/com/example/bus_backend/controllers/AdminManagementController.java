package com.example.bus_backend.controllers;

import com.example.bus_backend.models.Route;
import com.example.bus_backend.services.AdminService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/manage") // Matches the 'protected' pattern in SecurityConfig
@CrossOrigin(origins = "*")
public class AdminManagementController {

    private final AdminService adminService;

    public AdminManagementController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/routes")
    public Route addRoute(@RequestBody Route route) {
        return adminService.addRoute(route);
    }

    @GetMapping("/routes")
    public List<Route> getRoutes() {
        return adminService.getAllRoutes();
    }

    @DeleteMapping("/routes/{id}")
    public String deleteRoute(@PathVariable String id) {
        adminService.deleteRoute(id);
        return "Route Deleted";
    }
}