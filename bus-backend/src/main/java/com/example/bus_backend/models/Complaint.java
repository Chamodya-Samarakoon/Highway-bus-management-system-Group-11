package com.example.bus_backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document(collection = "complaints")
public class Complaint {

    @Id
    private String id;

    // User Identification
    private String userId;
    private String userName;
    private String email;

    // Content
    private String message;
    
    // Management/Resolution
    private String response;
    private String status; // e.g., "Pending", "Resolved", "In Progress"
    
    // Timestamp
    private Instant date;

    // --- Constructors ---

    // Default Constructor (Required by Spring Data / MongoDB)
    public Complaint() {
    }

    // Full Parameterized Constructor
    public Complaint(String id, String userId, String userName, String email, 
                     String message, String response, String status, Instant date) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.message = message;
        this.response = response;
        this.status = status;
        this.date = date;
    }

    // --- Getters and Setters ---

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }
}