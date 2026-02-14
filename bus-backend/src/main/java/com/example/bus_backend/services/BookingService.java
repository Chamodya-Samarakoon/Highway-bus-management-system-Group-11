package com.example.bus_backend.services;

import com.example.bus_backend.models.Booking;
import com.example.bus_backend.repositories.BookingRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepo;

    public BookingService(BookingRepository bookingRepo) {
        this.bookingRepo = bookingRepo;
    }

    // CREATE: Sets the timestamp and default status before saving to MongoDB
    public Booking createBooking(Booking b) {
        b.setBookingDate(Instant.now());
        if (b.getStatus() == null) {
            b.setStatus("CONFIRMED");
        }
        return bookingRepo.save(b);
    }

    // READ ALL: For Admin dashboard
    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    // READ BY PASSENGER: For "My Bookings" section in Mobile/Web app
    public List<Booking> getBookingsByPassenger(String passengerId) {
        return bookingRepo.findByPassengerID(passengerId);
    }

    // READ BY ID
    public Optional<Booking> getBooking(String id) {
        return bookingRepo.findById(id);
    }

    // UPDATE: Status change (Cancel)
    public Booking cancelBooking(String id) {
        Booking b = bookingRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        b.setStatus("CANCELLED");
        return bookingRepo.save(b);
    }

    // UPDATE: Modify seats or trip details
    public Booking modifyBooking(String id, Booking modified) {
        Booking b = bookingRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        
        // Updating fields from the combined model
        b.setSeatNumber(modified.getSeatNumber());
        b.setSeatsBooked(modified.getSeatsBooked());
        b.setScheduleTime(modified.getScheduleTime());
        b.setCustomerName(modified.getCustomerName());
        b.setCustomerPhone(modified.getCustomerPhone());
        b.setTotalAmount(modified.getTotalAmount());
        
        return bookingRepo.save(b);
    }

    // DELETE: Permanent removal
    public void deleteBooking(String id) {
        if (!bookingRepo.existsById(id)) {
            throw new RuntimeException("Cannot delete. Booking not found: " + id);
        }
        bookingRepo.deleteById(id);
    }
}