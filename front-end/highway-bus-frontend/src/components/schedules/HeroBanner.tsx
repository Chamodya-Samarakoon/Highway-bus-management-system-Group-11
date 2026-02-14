import hero from "../../assets/hero.jpg";

export default function HeroBanner({
    title = "Travel with Comfort",
    subtitle = "Book your highway bus tickets easily and travel across the country with our premium service",
}: {
    title?: string;
    subtitle?: string;
}) {
    return (
        <section className="hero">
            <img className="hero__img" src={hero} alt="hero" />
            <div className="hero__overlay" />
            <div className="hero__content">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
        </section>
    );
}
