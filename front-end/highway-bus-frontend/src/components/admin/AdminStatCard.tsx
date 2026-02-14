import Card from "../common/Card";

export default function AdminStatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <Card className="statCard">npm ls react
            <div className="statLabel">{label}</div>
            <div className="statValue">{value}</div>
        </Card>
    );
}
