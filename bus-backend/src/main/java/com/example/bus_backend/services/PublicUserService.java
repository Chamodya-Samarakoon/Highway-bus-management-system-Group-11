package com.example.bus_backend.services;

import com.example.bus_backend.models.*;
import java.util.List;

public interface PublicUserService {

    List<Announcement> viewAnnouncements();

    List<Schedule> viewSchedules();

    List<Route> viewRoutes();

    List<TicketPrice> viewTicketPrices();

    public List<Schedule> viewSchedulesByRoute(String departure, String arrival);

}