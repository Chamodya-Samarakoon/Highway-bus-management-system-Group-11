import { useMemo } from "react";

export default function SeatPicker({
    total,
    available,
    selected,
    onToggle,
    max = 5,
}: {
    total: number;
    available: number;
    selected: number[];
    onToggle: (seat: number) => void;
    max?: number;
}) {
    // Simple seat map: assume seats 1..total, first (total-available) are unavailable
    const unavailableSet = useMemo(() => {
        const countUnavailable = Math.max(0, total - available);
        const set = new Set<number>();
        for (let i = 1; i <= countUnavailable; i++) set.add(i);
        return set;
    }, [total, available]);

    return (
        <div className="seatWrap">
            <div className="seatLegend">
                <span className="seat seat--free" /> Free
                <span className="seat seat--selected" /> Selected
                <span className="seat seat--busy" /> Unavailable
                <span className="seatNote">Max {max} seats</span>
            </div>

            <div className="seatGrid">
                {Array.from({ length: total }).map((_, idx) => {
                    const seat = idx + 1;
                    const isBusy = unavailableSet.has(seat);
                    const isSelected = selected.includes(seat);
                    const disabled = isBusy || (!isSelected && selected.length >= max);

                    return (
                        <button
                            key={seat}
                            className={`seat ${isBusy ? "seat--busy" : isSelected ? "seat--selected" : "seat--free"}`}
                            disabled={disabled}
                            onClick={() => onToggle(seat)}
                            type="button"
                            title={`Seat ${seat}`}
                        >
                            {seat}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
