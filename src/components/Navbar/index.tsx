import React, {useEffect, useState} from 'react';
import "./index.css";
import Logo from "../../images/logo.jpg";
import {useNavigate} from "react-router-dom";
import {AiOutlineWechat} from "react-icons/ai";
import {FaUserAlt} from "react-icons/fa"
import {AiFillHome} from "react-icons/ai";
import NotificationModal from "./components/NotificationModal";
import {useNotifications} from "./hooks/api";
import {AiOutlineMail} from "react-icons/ai";
import {notification} from "./types";


function Navbar() {

    const navigate = useNavigate();

    const {data} = useNotifications();

    const [unReadNotifics, setUnReadNotifics] = useState<number>(0)

    const [showNotificationsModal, setShowNotificationsModal] = useState(false);

    useEffect(() => {
        if(data) {
            let unReadNotific = 0
            for(let i = 0; i < data?.length; i++) {
                if(data[i].isRead === 0) unReadNotific = unReadNotific + 1;
            }
            setUnReadNotifics(unReadNotific)
        }
    }, [data]);

    const hideNotificModal = () => {
        setShowNotificationsModal(false);
    };



    return (
        <nav>
            {showNotificationsModal && <NotificationModal notifications={data} hideNotificModal={hideNotificModal} />}
            <button type="button"><img onClick={() => navigate("/home")} alt="logo" src={Logo} /></button>
            <ul>
                <li>
                    <div role="unReadNotifics" className="notificationCounter">{unReadNotifics}</div>
                    <button role="notificationsBtn" type="button" onClick={() => setShowNotificationsModal(true)}><AiOutlineMail className="navIcon" /></button>
                </li>
                <li><button type="button" onClick={() => navigate("/chat")}><AiOutlineWechat className="navIcon" /></button></li>
                <li><button type="button" onClick={() => navigate("/profile")}><FaUserAlt className="navIcon" /></button></li>
                <li><button type="button" onClick={() => navigate("/home")}><AiFillHome className="navIcon" /></button></li>
            </ul>
        </nav>
    );
}

export default Navbar;