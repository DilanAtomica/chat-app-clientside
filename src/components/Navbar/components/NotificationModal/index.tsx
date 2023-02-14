import React from 'react';
import "./index.css";
import {notification} from "../../types";
import {getWrittenDate} from "../../../../utils/dateFormat";
import {HiOutlineMail} from "react-icons/hi";

type notificationModalTypes = {
    notifications: notification[],
    hideNotificModal: () => void,
}

function NotificationModal({notifications, hideNotificModal}: notificationModalTypes) {

    const onBackgroundClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target instanceof HTMLElement) {
            if(e.target.classList.contains("notificationModalBackground")) hideNotificModal();
        }
    };

    return (
        <div onClick={onBackgroundClick} className="notificationModalBackground">
            <div className="notificationModal">
                <header>
                    <h1>Notifications</h1>
                </header>
                <ul>
                    {notifications?.map((notific: any) => (
                        <li key={notific.notificID}>
                            <button><HiOutlineMail id="mailIcon" /><h2>{getWrittenDate(notific.created_at)}</h2></button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default NotificationModal;