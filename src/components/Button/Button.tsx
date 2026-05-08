import type { ReactNode } from "react";


interface IButton {
    className?: string,
    type: "button" | "submit" | "reset",
    children: ReactNode;
    onClick?: () => void;
    isDisabled: boolean
}

export const Button = (props: IButton) => {
    const {
        className = "",
        type= "button",
        children,
        onClick,
        isDisabled
    } = props;

    return (
        <button 
            className={`button ${className}`} 
            type={type}
            onClick={onClick}
            disabled= {isDisabled}
        >
            {children}
        </button>
    )
}