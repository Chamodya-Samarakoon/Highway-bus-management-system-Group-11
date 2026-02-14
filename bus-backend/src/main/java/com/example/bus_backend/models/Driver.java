package com.example.bus_backend.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "drivers")
public class Driver {

    @Id
    private String id;

    private String name;
    private String licenseNumber;
    private String phone;
    private String status; // Active / Inactive / Suspended
}
