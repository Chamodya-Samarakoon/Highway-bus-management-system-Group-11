package com.example.bus_backend.repositories;

import com.example.bus_backend.models.Trip;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TripRepository extends MongoRepository<Trip, String> {

    // Custom query to filter trips by status (e.g., "Upcoming", "Ongoing", "Completed")
    List<Trip> findByStatus(String status);

    // Optional: Find all trips assigned to a specific bus
    List<Trip> findByBusId(String busId);

    // Optional: Find all trips for a specific route
    List<Trip> findByRouteId(String routeId);
}