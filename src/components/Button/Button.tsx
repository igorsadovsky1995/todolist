import type { ReactNode } from "react";


interface IButton {
    className?: string,
    type: "button" | "submit" | "reset",
    children: ReactNode;
}

export const Button = (props: IButton) => {
    const {
        className = "",
        type= "button",
        children
    } = props;

    return (
        <button 
            className={`button ${className}`} 
            type={type}
        >
            {children}
        </button>
    )
}