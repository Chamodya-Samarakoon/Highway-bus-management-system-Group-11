package com.example.bus_backend.controllers;

import com.example.bus_backend.models.Complaint;
import com.example.bus_backend.services.ComplaintService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class ComplaintController {

    private final ComplaintService service;

    public ComplaintController(ComplaintService service) {
        this.service = service;
    }

    @PostMapping("/submit")
    public ResponseEntity<Complaint> submit(@RequestBody Complaint c) {
        return ResponseEntity.ok(service.submit(c));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Complaint>> all() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}/response")
    public ResponseEntity<Complaint> update(@PathVariable String id, @RequestBody String response) {
        return ResponseEntity.ok(service.updateResponse(id, response));
    }
}