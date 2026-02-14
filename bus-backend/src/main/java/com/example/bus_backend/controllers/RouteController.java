package com.example.bus_backend.controllers;

import com.example.bus_backend.models.Route;
import com.example.bus_backend.services.RouteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "*") // Allows Postman and Frontend access
public class RouteController {

    private final RouteService service;

    // Constructor injection is preferred over @Autowired
    public RouteController(RouteService service) {
        this.service = service;
    }

    // CREATE: POST http://localhost:8080/api/routes
    @PostMapping
    public ResponseEntity<Route> create(@RequestBody Route route) {
        Route saved = service.addRoute(route);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // READ ALL: GET http://localhost:8080/api/routes
    @GetMapping
    public ResponseEntity<List<Route>> getAll() {
        List<Route> routes = service.getAll();
        return ResponseEntity.ok(routes);
    }

    // READ BY ID: GET http://localhost:8080/api/routes/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Route> getById(@PathVariable String id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // UPDATE: PUT http://localhost:8080/api/routes/{id}
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody Route updatedRoute) {
        try {
            Route saved = service.updateRoute(id, updatedRoute);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // DELETE: DELETE http://localhost:8080/api/routes/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        try {
            service.delete(id);
            return ResponseEntity.noContent().build(); // Returns 204 No Content
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}