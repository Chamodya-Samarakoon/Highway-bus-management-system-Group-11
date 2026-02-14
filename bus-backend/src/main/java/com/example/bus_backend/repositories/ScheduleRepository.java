package com.example.bus_backend.repositories;

import com.example.bus_backend.models.Schedule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ScheduleRepository extends MongoRepository<Schedule, String> {

    // From Snippet 1: Search by location names (useful for general searches)
    List<Schedule> findByDepartureLocationAndArrivalLocation(String departureLocation, String arrivalLocation);

    // From Snippet 2: Search by specific Route ID (useful for internal logic)
    List<Schedule> findByRouteId(String routeId);

    // Optional: Search by Bus ID to see all schedules for a specific vehicle
    List<Schedule> findByBusId(String busId);
}