import React, {ReactNode} from 'react';
import "./index.css";

type buttonProps = {
    children: ReactNode,
    buttonType: "button" | "submit",
    disabled: boolean,
}

function Button({children, buttonType, disabled} : buttonProps) {
    return (
        <button role={"submitBtn"} style={{opacity: disabled ? "0.5" : "1"}} disabled={disabled} id="button" type={buttonType}>{children}</button>
    );
}

export default Button;