package com.example.bus_backend.repositories;

import com.example.bus_backend.models.Route;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RouteRepository extends MongoRepository<Route, String> {

    // Custom query to find a route by specific start and end locations
    Optional<Route> findByStartLocationAndEndLocation(String startLocation, String endLocation);

    // Custom query to find all routes starting from a specific city
    List<Route> findByStartLocation(String startLocation);
}