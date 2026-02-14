package com.example.bus_backend.controllers;

import com.example.bus_backend.models.*;
import com.example.bus_backend.services.ConductorService;
import com.example.bus_backend.repositories.UserRepository; // FIX: Added import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/conductor")
@CrossOrigin(origins = "*")
public class ConductorController {

    @Autowired private ConductorService conductorService;
    
    @Autowired private UserRepository userRepository; // FIX: Added injection

    @GetMapping("/all")
    public List<User> listConductors() {
        return userRepository.findAll().stream()
                .filter(u -> "CONDUCTOR".equalsIgnoreCase(u.getRole()))
                .collect(Collectors.toList());
    }

    @PutMapping("/trip/status/{tripId}")
    public ResponseEntity<Trip> updateTripStatus(@PathVariable String tripId, @RequestParam String status) {
        return ResponseEntity.ok(conductorService.updateTripStatus(tripId, status));
    }

    @PostMapping("/issue")
    public ResponseEntity<Issue> reportIssue(@RequestBody Issue issue) {
        return ResponseEntity.ok(conductorService.reportIssue(issue));
    }

    @PutMapping("/trip/passengers/{tripId}")
    public ResponseEntity<Trip> recordPassengerData(@PathVariable String tripId, @RequestParam int count) {
        return ResponseEntity.ok(conductorService.recordPassengerData(tripId, count));
    }

    @GetMapping("/history")
    public ResponseEntity<List<Trip>> viewTripHistory() {
        return ResponseEntity.ok(conductorService.viewTripHistory());
    }
}