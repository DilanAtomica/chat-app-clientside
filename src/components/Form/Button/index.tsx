import React, {ReactNode} from 'react';
import "./index.css";

type buttonProps = {
    children: ReactNode,
    buttonType: "button" | "submit",
    disabled: boolean,
}

function Button({children, buttonType, disabled} : buttonProps) {
    return (
        <button disabled={disabled} id="button" type={buttonType}>{children}</button>
    );
}

export default Button;