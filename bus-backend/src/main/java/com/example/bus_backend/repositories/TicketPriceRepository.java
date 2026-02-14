package com.example.bus_backend.repositories;

import com.example.bus_backend.models.TicketPrice;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TicketPriceRepository extends MongoRepository<TicketPrice, String> {}
