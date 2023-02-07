import React, {ReactNode} from 'react';
import "./index.css";

type buttonProps = {
    children: ReactNode,
    buttonType: "button" | "submit",
    disabled: boolean,
    width: string,
}

function Button({children, buttonType, disabled, width} : buttonProps) {
    return (
        <button role={"submitBtn"} style={{opacity: disabled ? "0.5" : "1", width: width}} disabled={disabled} id="button" type={buttonType}>{children}</button>
    );
}

export default Button;