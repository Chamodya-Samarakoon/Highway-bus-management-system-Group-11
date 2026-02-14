export type Role = "PASSENGER" | "ADMIN";

export type User = {
    id: string;
    fullName: string;
    email: string;
    role: Role;
};

export type AuthResponse = {
    token: string;
    user: User;
};

export type BusSchedule = {
    id: string;
    code: string;        // HB-101
    type: "Express" | "Regular";
    from: string;
    to: string;
    departureTime: string; // "08:00 AM"
    arrivalTime: string;   // "12:30 PM"
    priceLkr: number;      // 45
    seatsTotal: number;    // 40
    seatsAvailable: number;// 28
};

export type Booking = {
    id: string;
    scheduleId: string;
    scheduleCode: string;
    from: string;
    to: string;
    departureTime: string;
    seats: number[];
    totalPrice: number;
    status: "CONFIRMED" | "CANCELLED" | "PENDING";
    createdAt: string;
};

export type Feedback = {
    id: string;
    type: "Feedback" | "Complaint";
    busNumber?: string;
    subject: string;
    message: string;
    status?: "NEW" | "IN_PROGRESS" | "RESOLVED";
    createdAt: string;
};
