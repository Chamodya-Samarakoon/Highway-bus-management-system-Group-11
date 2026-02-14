import Input from "../common/Input";

export default function ScheduleFilters({
    from,
    to,
    onChangeFrom,
    onChangeTo,
}: {
    from: string;
    to: string;
    onChangeFrom: (v: string) => void;
    onChangeTo: (v: string) => void;
}) {
    return (
        <div className="filters">
            <Input label="From" placeholder="Enter departure city" value={from} onChange={(e) => onChangeFrom(e.target.value)} />
            <Input label="To" placeholder="Enter destination city" value={to} onChange={(e) => onChangeTo(e.target.value)} />
        </div>
    );
}
