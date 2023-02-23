import React from 'react';
import "./index.css";
import Button from "../../../Form/Button";

type logoutModalProps = {
    visitProfile: () => void,
    logout: () => void,
}

function LogoutModal({visitProfile, logout}: logoutModalProps) {

    return (
        <div id="logoutModal" className="logoutModal">
            <Button onClick={visitProfile} buttonType={"button"} disabled={false} width={"5rem"}>Profile</Button>

            <Button onClick={logout} buttonType={"button"} disabled={false} width={"5rem"}>Log out</Button>
        </div>
    );
}

export default LogoutModal;