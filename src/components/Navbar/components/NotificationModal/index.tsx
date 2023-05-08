import React, {useState} from 'react';
import "./index.css";
import {notification} from "../../types";
import {BsArrowLeft} from "react-icons/bs";
import {useReadNotification} from "../../hooks/api";
import Notification from "./components/Notification";
import Button from "../../../Form/Button";

type notificationModalTypes = {
    notifications: notification[],
    hideNotificModal: () => void,
    refetchNotifications: () => void,
}

function NotificationModal({notifications, hideNotificModal, refetchNotifications}: notificationModalTypes) {

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
        refetchNotifications();
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
                : <p className="notificMsg" role="notificMsg">{notificText}</p>
                }

                {notifications.length === 0 && <p>You don't have any notifications</p>}

                <Button onClick={() => hideNotificModal()} buttonType={"button"} disabled={false} width={"max-content"}>Close</Button>

            </div>
        </div>
    );
}

export default NotificationModal;