package com.example.bus_backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "announcements")
public class Announcement {

    @Id
    private String id;
    private String title;
    private String message;
    private String date;

        public String getId() {
        return id;
    }


    public String getTitle() {
        return title;
    }


    public String getMessage() {
        return message;
    }



    public String getDate() {
        return date;
    }

}
