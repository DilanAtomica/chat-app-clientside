import React, {MouseEventHandler, ReactNode} from 'react';
import "./index.css";

type buttonProps =  | ({
    buttonType: "submit",
    onClick?: never,
} | {
    buttonType: "button",
    onClick: MouseEventHandler<HTMLButtonElement>,
}) & {
    children: ReactNode,
    disabled: boolean,
    width: string,
    margin?: string,
};

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