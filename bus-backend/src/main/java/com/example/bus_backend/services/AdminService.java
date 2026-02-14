package com.example.bus_backend.services;

import java.util.List;

import com.example.bus_backend.models.Route;

public interface AdminService {
    Route addRoute(Route route);
    List<Route> getAllRoutes();
    void deleteRoute(String id);
}

