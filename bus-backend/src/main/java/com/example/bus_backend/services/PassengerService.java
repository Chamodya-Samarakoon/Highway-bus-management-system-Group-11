package com.example.bus_backend.services;

import com.example.bus_backend.models.Passenger;
import com.example.bus_backend.repositories.PassengerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PassengerService {
    private final PassengerRepository repo;

    public PassengerService(PassengerRepository repo) {
        this.repo = repo;
    }

    // Register a new passenger
    public Passenger register(Passenger p) {
        return repo.save(p);
    }

    // Find by email (for login/check)
    public Passenger findByEmail(String email) {
        return repo.findByEmail(email);
    }

    // FIX: This method was missing or not detected
    public Optional<Passenger> findById(String id) {
        return repo.findById(id);
    }

    // Find all passengers
    public List<Passenger> findAll() {
        return repo.findAll();
    }
}