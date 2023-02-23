import React from 'react';
import "./index.css";
import Button from "../../../Form/Button";

function LogoutModal() {

    return (
        <div id="logoutModal" className="logoutModal">
            <Button onClick={() => console.log("hey")} buttonType={"button"} disabled={false} width={"5rem"}>Profile</Button>

            <Button onClick={() => console.log("hey")} buttonType={"button"} disabled={false} width={"5rem"}>Log out</Button>
        </div>
    );
}

export default LogoutModal;