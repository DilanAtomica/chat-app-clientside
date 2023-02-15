import React, {useState} from 'react';
import "./index.css";
import Logo from "../../images/logo.jpg";
import {useNavigate} from "react-router-dom";
import {AiOutlineWechat} from "react-icons/ai";
import {FaUserAlt} from "react-icons/fa"
import {AiFillHome} from "react-icons/ai";
import NotificationModal from "./components/NotificationModal";
import {useNotifications} from "./hooks/api";
import {AiOutlineMail} from "react-icons/ai";


function Navbar() {

    const navigate = useNavigate();

    const {data} = useNotifications();

    const [showNotificationsModal, setShowNotificationsModal] = useState(false);

    const hideNotificModal = () => {
        setShowNotificationsModal(false);
    }

    return (
        <nav>
            {showNotificationsModal && <NotificationModal notifications={data} hideNotificModal={hideNotificModal} />}
            <button type="button"><img onClick={() => navigate("/home")} alt="logo" src={Logo} /></button>
            <ul>
                <li>
                    <div className="notificationCounter">{data?.length}</div>
                    <button type="button" onClick={() => setShowNotificationsModal(true)}><AiOutlineMail className="navIcon" /></button>
                </li>
                <li><button type="button" onClick={() => navigate("/chat")}><AiOutlineWechat className="navIcon" /></button></li>
                <li><button type="button" onClick={() => navigate("/profile")}><FaUserAlt className="navIcon" /></button></li>
                <li><button type="button" onClick={() => navigate("/home")}><AiFillHome className="navIcon" /></button></li>
            </ul>
        </nav>
    );
}

export default Navbar;