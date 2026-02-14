package com.example.bus_backend.repositories;

import com.example.bus_backend.models.Driver;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DriverRepository extends MongoRepository<Driver, String> {}
