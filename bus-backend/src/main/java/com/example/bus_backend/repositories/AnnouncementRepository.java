package com.example.bus_backend.repositories;

import com.example.bus_backend.models.Announcement;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnnouncementRepository extends MongoRepository<Announcement, String> {}

