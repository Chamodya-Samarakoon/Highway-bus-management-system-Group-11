package com.example.bus_backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "routes")
public class Route {

    @Id
    private String routeId; // Mapping to MongoDB _id
    
    private String startLocation;
    private String endLocation;
    private double distance;
    private double duration; // Added from the second snippet

    // --- Constructors ---

    // Default Constructor (Required for Spring Data MongoDB)
    public Route() {
    }

    // Full Parameterized Constructor
    public Route(String routeId, String startLocation, String endLocation, double distance, double duration) {
        this.routeId = routeId;
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        this.distance = distance;
        this.duration = duration;
    }

    // --- Getters and Setters ---

    public String getRouteId() {
        return routeId;
    }

    public void setRouteId(String routeId) {
        this.routeId = routeId;
    }

    public String getStartLocation() {
        return startLocation;
    }

    public void setStartLocation(String startLocation) {
        this.startLocation = startLocation;
    }

    public String getEndLocation() {
        return endLocation;
    }

    public void setEndLocation(String endLocation) {
        this.endLocation = endLocation;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }
}