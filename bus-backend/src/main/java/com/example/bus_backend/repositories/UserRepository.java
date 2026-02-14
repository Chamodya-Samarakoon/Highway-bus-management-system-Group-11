package com.example.bus_backend.repositories;

import com.example.bus_backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    
    boolean existsByUsername(String username);
    
    // --- ADD THIS LINE ---
    boolean existsByEmail(String email); 
}
