import type { ReactNode } from "react";


interface IButton {
    className?: string,
    type: "button" | "submit" | "reset",
    children: ReactNode;
    onClick?: () => void
}

export const Button = (props: IButton) => {
    const {
        className = "",
        type= "button",
        children,
        onClick
    } = props;

    return (
        <button 
            className={`button ${className}`} 
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}