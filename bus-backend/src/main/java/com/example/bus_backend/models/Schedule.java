package com.example.bus_backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document(collection = "schedules")
public class Schedule {

    @Id
    private String scheduleId; // Maps to _id in MongoDB Compass
    
    private String busId;      // Combined 'busNo' and 'busId'
    private String routeId;
    
    // Locations (from snippet 1)
    private String departureLocation;
    private String arrivalLocation;
    
    // Time Tracking (Snippet 2's Instant is better for MongoDB than String time)
    private Instant departureTime;
    private Instant arrivalTime;
    
    // Operational Details
    private String frequency;  // e.g., "Daily", "Weekends"
    private Integer totalSeats;
    private Integer availableSeats;

    // --- Constructors ---

    public Schedule() {
    }

    public Schedule(String scheduleId, String busId, String routeId, String departureLocation, 
                    String arrivalLocation, Instant departureTime, Instant arrivalTime, 
                    String frequency, Integer totalSeats, Integer availableSeats) {
        this.scheduleId = scheduleId;
        this.busId = busId;
        this.routeId = routeId;
        this.departureLocation = departureLocation;
        this.arrivalLocation = arrivalLocation;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.frequency = frequency;
        this.totalSeats = totalSeats;
        this.availableSeats = availableSeats;
    }

    // --- Getters and Setters ---

    public String getScheduleId() { return scheduleId; }
    public void setScheduleId(String scheduleId) { this.scheduleId = scheduleId; }

    public String getBusId() { return busId; }
    public void setBusId(String busId) { this.busId = busId; }

    public String getRouteId() { return routeId; }
    public void setRouteId(String routeId) { this.routeId = routeId; }

    public String getDepartureLocation() { return departureLocation; }
    public void setDepartureLocation(String departureLocation) { this.departureLocation = departureLocation; }

    public String getArrivalLocation() { return arrivalLocation; }
    public void setArrivalLocation(String arrivalLocation) { this.arrivalLocation = arrivalLocation; }

    public Instant getDepartureTime() { return departureTime; }
    public void setDepartureTime(Instant departureTime) { this.departureTime = departureTime; }

    public Instant getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(Instant arrivalTime) { this.arrivalTime = arrivalTime; }

    public String getFrequency() { return frequency; }
    public void setFrequency(String frequency) { this.frequency = frequency; }

    public Integer getTotalSeats() { return totalSeats; }
    public void setTotalSeats(Integer totalSeats) { this.totalSeats = totalSeats; }

    public Integer getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(Integer availableSeats) { this.availableSeats = availableSeats; }
}