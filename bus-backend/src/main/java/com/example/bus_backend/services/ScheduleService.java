package com.example.bus_backend.services;

import com.example.bus_backend.models.Schedule;
import com.example.bus_backend.repositories.ScheduleRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {
    private final ScheduleRepository repo;

    public ScheduleService(ScheduleRepository repo) { 
        this.repo = repo; 
    }

    public Schedule addSchedule(Schedule s) { 
        // Automatically sync available seats with total seats on creation
        if (s.getTotalSeats() != null && s.getAvailableSeats() == null) {
            s.setAvailableSeats(s.getTotalSeats());
        }
        return repo.save(s); 
    }

    public List<Schedule> findByRoute(String routeId) { 
        return repo.findByRouteId(routeId); 
    }

    public Optional<Schedule> findById(String id) { 
        return repo.findById(id); 
    }

    public List<Schedule> getAll() { 
        return repo.findAll(); 
    }

    public Schedule update(String id, Schedule updated) {
        Schedule s = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));

        if (updated.getRouteId() != null) s.setRouteId(updated.getRouteId());
        if (updated.getBusId() != null) s.setBusId(updated.getBusId());
        if (updated.getDepartureTime() != null) s.setDepartureTime(updated.getDepartureTime());
        if (updated.getArrivalTime() != null) s.setArrivalTime(updated.getArrivalTime());
        if (updated.getFrequency() != null) s.setFrequency(updated.getFrequency());
        if (updated.getTotalSeats() != null) s.setTotalSeats(updated.getTotalSeats());
        if (updated.getAvailableSeats() != null) s.setAvailableSeats(updated.getAvailableSeats());

        return repo.save(s);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}