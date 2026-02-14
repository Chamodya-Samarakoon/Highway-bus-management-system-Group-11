import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "danger";
};

export default function Button({ variant = "primary", className = "", ...props }: Props) {
    return <button {...props} className={`btn btn--${variant} ${className}`} />;
}
