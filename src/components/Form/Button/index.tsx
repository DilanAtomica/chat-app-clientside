import React, {ReactNode} from 'react';
import "./index.css";

type buttonProps = {
    children: ReactNode,
    buttonType: "button" | "submit",
    disabled: boolean,
    width: string,
    setSeason?: (seasonNumber: number) => void,
    seasonNumber?: number,
}

function Button({children, buttonType, disabled, width, setSeason, seasonNumber} : buttonProps) {

    const handleOnClick = () => {
        if(setSeason && seasonNumber) setSeason(seasonNumber);
    }

    return (
        <button onClick={handleOnClick} role={"submitBtn"} style={{opacity: disabled ? "0.5" : "1", width: width}} disabled={disabled} id="button" type={buttonType}>
            {children}
        </button>
    );
}

export default Button;