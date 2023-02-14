import React, {useState} from 'react';
import "./index.css";
import Logo from "../../images/logo.jpg";
import {useNavigate} from "react-router-dom";
import {AiOutlineWechat} from "react-icons/ai";
import {FaUserAlt} from "react-icons/fa"
import {AiFillHome} from "react-icons/ai";
import NotificationModal from "./components/NotificationModal";
import {useNotifications} from "./hooks/api";
import {BsMailbox} from "react-icons/bs";


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
            <button><img onClick={() => navigate("/home")} alt="logo" src={Logo} /></button>
            <ul>
                <li><button><BsMailbox onClick={() => setShowNotificationsModal(true)} className="navIcon" /></button></li>
                <li><button><AiOutlineWechat onClick={() => navigate("/chat")} className="navIcon" /></button></li>
                <li><button><FaUserAlt onClick={() => navigate("/profile")} className="navIcon" /></button></li>
                <li><button><AiFillHome onClick={() => navigate("/home")} className="navIcon" /></button></li>
            </ul>
        </nav>
    );
}

export default Navbar;