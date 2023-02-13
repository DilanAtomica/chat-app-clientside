import React, {MouseEventHandler, ReactNode} from 'react';
import "./index.css";

type buttonProps = {
    children: ReactNode,
    buttonType: "button" | "submit",
    disabled: boolean,
    width: string,
    margin?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

function Button({children, buttonType, disabled, width, margin, onClick} : buttonProps) {
    return (
        <button onClick={onClick} role={"submitBtn"} style={{
            opacity: disabled ? "0.5" : "1",
            width: width,
            margin: margin && margin,
        }}
                disabled={disabled} id="button" type={buttonType}>
            {children}
        </button>
    );
}

export default Button;