package com.example.bus_backend.repositories;

import com.example.bus_backend.models.Bus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BusRepository extends MongoRepository<Bus, String> {

    // Custom query to find all buses assigned to a specific Driver
    List<Bus> findByDriverId(String driverId);

    // Custom query to find all buses assigned to a specific Conductor
    List<Bus> findByConductorId(String conductorId);

    // Optional: Find buses by their current status (e.g., "Active", "In Maintenance")
    List<Bus> findByStatus(String status);
}