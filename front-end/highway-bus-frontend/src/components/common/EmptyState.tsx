export default function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <div className="empty">
            <div className="empty__icon">🎟️</div>
            <h3 className="empty__title">{title}</h3>
            {subtitle && <p className="empty__sub">{subtitle}</p>}
        </div>
    );
}
