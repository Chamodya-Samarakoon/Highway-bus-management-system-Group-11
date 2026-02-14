package com.example.bus_backend.services;

import com.example.bus_backend.models.*;
import com.example.bus_backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ConductorService {
    @Autowired private TripRepository tripRepository;
    @Autowired private IssueRepository issueRepository;
    @Autowired private BusRepository busRepository;

    public Trip updateTripStatus(String tripId, String status) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        trip.setStatus(status);
        return tripRepository.save(trip);
    }

    public Issue reportIssue(Issue issue) {
        issue.setReportedAt(LocalDateTime.now());
        return issueRepository.save(issue);
    }

    public Trip recordPassengerData(String tripId, int count) {
        Trip trip = tripRepository.findById(tripId).orElseThrow();
        trip.setPassengerCount(count);
        return tripRepository.save(trip);
    }

    public List<Trip> viewTripHistory() {
        return tripRepository.findByStatus("COMPLETED");
    }

    public List<Bus> viewAssignedBus(String conductorId) {
        return busRepository.findByConductorId(conductorId);
    }

    public List<String> viewAnnouncements() {
        // Dummy implementation (Real app would have an Announcement Repo)
        return List.of("Meeting at HQ at 5 PM", "Rain warning for Route A");
    }
}
