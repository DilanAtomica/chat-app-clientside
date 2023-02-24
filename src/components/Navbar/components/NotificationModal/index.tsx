import React, {useState} from 'react';
import "./index.css";
import {notification} from "../../types";
import {BsArrowLeft} from "react-icons/bs";
import {useReadNotification} from "../../hooks/api";
import Notification from "./components/Notification";

type notificationModalTypes = {
    notifications: notification[],
    hideNotificModal: () => void,
}

function NotificationModal({notifications, hideNotificModal}: notificationModalTypes) {

    const {mutateAsync} = useReadNotification();

    const [notificText, setNotificText] = useState<null | string>(null);

    const onBackgroundClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target instanceof HTMLElement) {
            if(e.target.classList.contains("notificationModalBackground")) hideNotificModal();
        }
    };

    const openNotification = async(notificMsg: string, notificID: number, isRead: number) => {
        setNotificText(notificMsg);
        await mutateAsync({notificID: notificID, isRead: isRead});
    }

    return (
        <div onClick={onBackgroundClick} className="notificationModalBackground">
            <div className="notificationModal">
                <header>
                    {!notificText
                        ? <h1>Notifications</h1>
                        : <button onClick={() => setNotificText(null)} type="button"><BsArrowLeft id="backIcon"/> Go back</button>
                    }
                </header>
                {!notificText ? <ul>
                    {notifications?.map((notific: notification) => (
                        <Notification key={notific.notificID} created_at={notific.created_at} notificID={notific.notificID} notificMsg={notific.notificMsg}
                                      isRead={notific.isRead} userID={notific.userID} openNotification={openNotification} />
                    ))}
                </ul>
                : <p role="notificMsg">{notificText}</p>
                }

            </div>
        </div>
    );
}

export default NotificationModal;