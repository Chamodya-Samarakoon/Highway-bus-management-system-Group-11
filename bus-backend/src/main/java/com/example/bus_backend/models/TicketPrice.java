package com.example.bus_backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ticket_prices")
public class TicketPrice {

    @Id
    private String id;
    private String routeId;
    private double price;


        public String getId() {
        return id;
    }


    public String getRouteId() {
        return routeId;
    }


    public double getPrice() {
        return price;
    }
}

