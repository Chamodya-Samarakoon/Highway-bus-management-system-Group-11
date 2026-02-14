package com.example.bus_backend.services.Impl;

import com.example.bus_backend.models.*;
import com.example.bus_backend.repositories.*;
import org.springframework.stereotype.Service;
import com.example.bus_backend.services.PublicUserService;
import java.util.List;

@Service
public class PublicUserServiceImpl implements PublicUserService {

    private final AnnouncementRepository announcementRepo;
    private final ScheduleRepository scheduleRepo;
    private final RouteRepository routeRepo;
    private final TicketPriceRepository priceRepo;

    public PublicUserServiceImpl(
            AnnouncementRepository announcementRepo,
            ScheduleRepository scheduleRepo,
            RouteRepository routeRepo,
            TicketPriceRepository priceRepo) {
        this.announcementRepo = announcementRepo;
        this.scheduleRepo = scheduleRepo;
        this.routeRepo = routeRepo;
        this.priceRepo = priceRepo;
    }

    @Override
    public List<Announcement> viewAnnouncements() {
        return announcementRepo.findAll();
    }

    @Override
    public List<Schedule> viewSchedules() {
        return scheduleRepo.findAll();
    }

    @Override
    public List<Route> viewRoutes() {
        return routeRepo.findAll();
    }

    @Override
    public List<TicketPrice> viewTicketPrices() {
        return priceRepo.findAll();
    }
   @Override
public List<Schedule> viewSchedulesByRoute(String departure, String arrival) {
    // Corrected to match the ScheduleRepository method name
    return scheduleRepo.findByDepartureLocationAndArrivalLocation(departure, arrival);
}
    

}
