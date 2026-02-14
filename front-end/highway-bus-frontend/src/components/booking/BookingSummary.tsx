import Card from "../common/Card";

export default function BookingSummary({
    from,
    to,
    code,
    departureTime,
    arrivalTime,
    price,
    seats,
}: {
    from: string;
    to: string;
    code: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    seats: number[];
}) {
    return (
        <Card className="summary">
            <h3>Booking Summary</h3>
            <div className="summaryRow"><span>Bus</span><b>{code}</b></div>
            <div className="summaryRow"><span>Route</span><b>{from} → {to}</b></div>
            <div className="summaryRow"><span>Time</span><b>{departureTime} - {arrivalTime}</b></div>
            <div className="summaryRow"><span>Seats</span><b>{seats.join(", ") || "-"}</b></div>
            <div className="summaryRow"><span>Price/seat</span><b>LKR {price}</b></div>
            <div className="summaryTotal"><span>Total</span><b>LKR {price * seats.length}</b></div>
        </Card>
    );
}
