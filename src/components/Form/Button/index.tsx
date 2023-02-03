import React, {ReactNode} from 'react';
import "./index.css";

type buttonProps = {
    children: ReactNode,
    buttonType: "button" | "submit",
}

function Button({children, buttonType} : buttonProps) {
    return (
        <button id="button" type={buttonType}>{children}</button>
    );
}

export default Button;