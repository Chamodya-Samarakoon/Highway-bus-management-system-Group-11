package com.example.bus_backend.repositories;

import com.example.bus_backend.models.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {

    // Retrieves all bookings made by a specific passenger
    List<Booking> findByPassengerID(String passengerID);

    // Retrieves all bookings for a specific bus schedule
    List<Booking> findByScheduleId(String scheduleId);
    
    // Optional: Find bookings by status (e.g., "Confirmed")
    List<Booking> findByStatus(String status);
}