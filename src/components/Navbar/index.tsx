import React from 'react';
import "./index.css";
import Logo from "../../images/logo.jpg";


function Navbar() {
    return (
        <nav>
            <img alt="logo" src={Logo} />
        </nav>
    );
}

export default Navbar;