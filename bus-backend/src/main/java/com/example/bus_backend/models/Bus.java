package com.example.bus_backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "buses")
public class Bus {

    @Id
    private String id;

    // Registration and Identification
    private String registrationNumber; 
    private String busNumber;
    
    // Specifications
    private String busType;        // "AC", "Non-AC", "Luxury"
    private int totalSeats;
    private String status;         // "Active", "Inactive", "In Maintenance"

    // Operational Assignments
    private String driverId;
    private String conductorId;
    private String routeName;

    // --- Constructors ---

    // Default Constructor (Required by Spring Data / MongoDB)
    public Bus() {
    }

    // Full Parameterized Constructor
    public Bus(String id, String registrationNumber, String busNumber, String busType, 
               int totalSeats, String status, String driverId, String conductorId, String routeName) {
        this.id = id;
        this.registrationNumber = registrationNumber;
        this.busNumber = busNumber;
        this.busType = busType;
        this.totalSeats = totalSeats;
        this.status = status;
        this.driverId = driverId;
        this.conductorId = conductorId;
        this.routeName = routeName;
    }

    // --- Getters and Setters ---

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getBusNumber() {
        return busNumber;
    }

    public void setBusNumber(String busNumber) {
        this.busNumber = busNumber;
    }

    public String getBusType() {
        return busType;
    }

    public void setBusType(String busType) {
        this.busType = busType;
    }

    public int getTotalSeats() {
        return totalSeats;
    }

    public void setTotalSeats(int totalSeats) {
        this.totalSeats = totalSeats;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDriverId() {
        return driverId;
    }

    public void setDriverId(String driverId) {
        this.driverId = driverId;
    }

    public String getConductorId() {
        return conductorId;
    }

    public void setConductorId(String conductorId) {
        this.conductorId = conductorId;
    }

    public String getRouteName() {
        return routeName;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }
}