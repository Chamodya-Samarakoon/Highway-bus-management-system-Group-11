package com.example.bus_backend.repositories;

import com.example.bus_backend.models.Complaint;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComplaintRepository extends MongoRepository<Complaint, String> {

    // Custom query to find all complaints submitted by a specific user
    List<Complaint> findByUserId(String userId);

    // Optional: Find complaints by status (e.g., "Pending" or "Resolved")
    List<Complaint> findByStatus(String status);
}