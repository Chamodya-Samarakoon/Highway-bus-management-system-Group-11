export default function Loading({ text = "Loading..." }: { text?: string }) {
    return (
        <div className="loading">
            <div className="spinner" />
            <span>{text}</span>
        </div>
    );
}
