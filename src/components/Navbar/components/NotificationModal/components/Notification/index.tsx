import React from 'react';
import "./index.css";
import {HiOutlineMail, HiOutlineMailOpen} from "react-icons/hi";
import {getWrittenDate} from "../../../../../../utils/dateFormat";
import {notification} from "../../../../types";

function Notification({notificMsg, notificID, isRead, created_at, userID, openNotification} :notification) {

    const onClick = () => {
        if (openNotification) openNotification(notificMsg, notificID, isRead);
    }

    return (
        <li>
            <button onClick={onClick} type="button">
                {isRead === 1  ? <HiOutlineMailOpen id="mailIcon" /> : <HiOutlineMail id="mailIcon" />}
                <h2>{getWrittenDate(created_at)}</h2>
            </button>
        </li>
    );
}

export default Notification;