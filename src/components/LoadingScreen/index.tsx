import React from 'react';
import "./index.css";
import {BeatLoader} from "react-spinners";

function LoadingScreen() {
    return (
        <div className="loadingScreen">
            <BeatLoader
                color="#0F62FE" size={30}
            />
        </div>
    );
}

export default LoadingScreen;