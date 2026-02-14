package com.example.bus_backend.services;

import com.example.bus_backend.models.Route;
import com.example.bus_backend.repositories.RouteRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RouteService {

    private final RouteRepository repo;

    public RouteService(RouteRepository repo) {
        this.repo = repo;
    }

    public Route addRoute(Route r) {
        return repo.save(r);
    }

    public List<Route> getAll() {
        return repo.findAll();
    }

    public Optional<Route> getById(String id) {
        return repo.findById(id);
    }

    public Route updateRoute(String id, Route updated) {
        Route r = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Route not found"));

        if (updated.getStartLocation() != null) r.setStartLocation(updated.getStartLocation());
        if (updated.getEndLocation() != null) r.setEndLocation(updated.getEndLocation());
        if (updated.getDistance() != 0) r.setDistance(updated.getDistance());
        if (updated.getDuration() != 0) r.setDuration(updated.getDuration());

        return repo.save(r);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}