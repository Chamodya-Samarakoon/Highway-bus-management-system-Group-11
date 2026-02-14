import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

export default function Input({ label, className = "", ...props }: Props) {
    return (
        <label className="field">
            {label && <span className="field__label">{label}</span>}
            <input className={`input ${className}`} {...props} />
        </label>
    );
}
