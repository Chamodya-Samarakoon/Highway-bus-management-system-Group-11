package com.example.bus_backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document(collection = "bookings")
public class Booking {

    @Id
    private String bookingID; // Maps to _id in MongoDB Compass

    // Passenger / Customer Details
    private String passengerID;
    private String customerName;
    private String customerPhone;

    // Trip & Route Details
    private String routeId;
    private String scheduleId;
    private String busId;
    private Instant scheduleTime;
    
    // Seat Information
    private int seatNumber;
    private int seatsBooked;

    // Payment & Status
    private double totalAmount;
    private Instant bookingDate;
    private String status; // Confirmed / Cancelled / Pending

    // --- Constructors ---

    // Default Constructor (Required by Spring Data MongoDB)
    public Booking() {
    }

    // Full Constructor
    public Booking(String bookingID, String passengerID, String customerName, String customerPhone, 
                   String routeId, String scheduleId, String busId, Instant scheduleTime, 
                   int seatNumber, int seatsBooked, double totalAmount, Instant bookingDate, String status) {
        this.bookingID = bookingID;
        this.passengerID = passengerID;
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.routeId = routeId;
        this.scheduleId = scheduleId;
        this.busId = busId;
        this.scheduleTime = scheduleTime;
        this.seatNumber = seatNumber;
        this.seatsBooked = seatsBooked;
        this.totalAmount = totalAmount;
        this.bookingDate = bookingDate;
        this.status = status;
    }

    // --- Getters and Setters ---

    public String getBookingID() { return bookingID; }
    public void setBookingID(String bookingID) { this.bookingID = bookingID; }

    public String getPassengerID() { return passengerID; }
    public void setPassengerID(String passengerID) { this.passengerID = passengerID; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }

    public String getRouteId() { return routeId; }
    public void setRouteId(String routeId) { this.routeId = routeId; }

    public String getScheduleId() { return scheduleId; }
    public void setScheduleId(String scheduleId) { this.scheduleId = scheduleId; }

    public String getBusId() { return busId; }
    public void setBusId(String busId) { this.busId = busId; }

    public Instant getScheduleTime() { return scheduleTime; }
    public void setScheduleTime(Instant scheduleTime) { this.scheduleTime = scheduleTime; }

    public int getSeatNumber() { return seatNumber; }
    public void setSeatNumber(int seatNumber) { this.seatNumber = seatNumber; }

    public int getSeatsBooked() { return seatsBooked; }
    public void setSeatsBooked(int seatsBooked) { this.seatsBooked = seatsBooked; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public Instant getBookingDate() { return bookingDate; }
    public void setBookingDate(Instant bookingDate) { this.bookingDate = bookingDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}