package com.example.bus_backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "trips")
public class Trip {

    @Id
    private String id;
    
    // IDs for relations
    private String busId;
    private String driverId;
    private String routeId;
    private String scheduleId;

    // Descriptive Route Info
    private String routeName;
    private String startLocation;
    private String endLocation;

    // Time and Status
    private LocalDateTime scheduleTime;
    private String tripDate; // Keeping String as per snippet 1, but scheduleTime is preferred
    private String status;   // Completed / Ongoing / Upcoming / Cancelled
    
    // Operational Data
    private int passengerCount;

    // --- Constructors ---

    public Trip() {
    }

    public Trip(String id, String busId, String driverId, String routeId, String scheduleId, 
                String routeName, String startLocation, String endLocation, 
                LocalDateTime scheduleTime, String tripDate, String status, int passengerCount) {
        this.id = id;
        this.busId = busId;
        this.driverId = driverId;
        this.routeId = routeId;
        this.scheduleId = scheduleId;
        this.routeName = routeName;
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        this.scheduleTime = scheduleTime;
        this.tripDate = tripDate;
        this.status = status;
        this.passengerCount = passengerCount;
    }

    // --- Getters & Setters ---

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBusId() { return busId; }
    public void setBusId(String busId) { this.busId = busId; }

    public String getDriverId() { return driverId; }
    public void setDriverId(String driverId) { this.driverId = driverId; }

    public String getRouteId() { return routeId; }
    public void setRouteId(String routeId) { this.routeId = routeId; }

    public String getScheduleId() { return scheduleId; }
    public void setScheduleId(String scheduleId) { this.scheduleId = scheduleId; }

    public String getRouteName() { return routeName; }
    public void setRouteName(String routeName) { this.routeName = routeName; }

    public String getStartLocation() { return startLocation; }
    public void setStartLocation(String startLocation) { this.startLocation = startLocation; }

    public String getEndLocation() { return endLocation; }
    public void setEndLocation(String endLocation) { this.endLocation = endLocation; }

    public LocalDateTime getScheduleTime() { return scheduleTime; }
    public void setScheduleTime(LocalDateTime scheduleTime) { this.scheduleTime = scheduleTime; }

    public String getTripDate() { return tripDate; }
    public void setTripDate(String tripDate) { this.tripDate = tripDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getPassengerCount() { return passengerCount; }
    public void setPassengerCount(int passengerCount) { this.passengerCount = passengerCount; }
}