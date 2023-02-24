import React, {useEffect, useState} from 'react';
import "./index.css";
import Logo from "../../images/logo.jpg";
import {useNavigate} from "react-router-dom";
import {AiOutlineWechat} from "react-icons/ai";
import {FaUserAlt} from "react-icons/fa"
import {AiFillHome} from "react-icons/ai";
import NotificationModal from "./components/NotificationModal";
import {useLogout, useNotifications} from "./hooks/api";
import {AiOutlineMail} from "react-icons/ai";
import LogoutModal from "./components/LogoutModal";

function Navbar() {

    const navigate = useNavigate();

    const {data, refetch: refetchNotifications} = useNotifications();
    const {mutateAsync} = useLogout();

    const [unReadNotifics, setUnReadNotifics] = useState<number>(0)

    const [showNotificationsModal, setShowNotificationsModal] = useState(false);
    const [avatarClicked, setAvatarClicked] = useState(false);

    useEffect(() => {
        if(data) setUnReadNotifics(getUnreadNotifications());
    }, [data]);

    const hideNotificModal = () => setShowNotificationsModal(false);

    const getUnreadNotifications = () => {
        let unReadNotific = 0
        for(let i = 0; i < data?.length; i++) {
            if(data[i].isRead === 0) unReadNotific = unReadNotific + 1;
        }
        return unReadNotific;
    };

    const handleAvatarClick = () => {
        setAvatarClicked(true);
        // @ts-ignore
        document.addEventListener("mousedown", (unClickAvatar));
        function unClickAvatar(e: React.MouseEvent<HTMLElement>) {
            if (e.target instanceof HTMLElement && e.target.parentElement) {
                if((e.target.id !== "logoutModal" && e.target.parentElement.id !== "logoutModal")) {
                    setAvatarClicked(false);
                    // @ts-ignore
                    document.removeEventListener("mousedown", (unClickAvatar));
                }
            }
        }
    }

    const visitProfile = () => {
        console.log("running")
        navigate("/profile");
    }

    const logout = async() => {
       await mutateAsync();
        navigate("/login");
    }

    return (
        <nav>
            {showNotificationsModal && <NotificationModal notifications={data} hideNotificModal={hideNotificModal}
                                       refetchNotifications={refetchNotifications}/>}
            <button type="button"><img onClick={() => navigate("/home")} alt="logo" src={Logo} /></button>
            <ul>
                <li>
                    <div role="unReadNotifics" className="notificationCounter">{unReadNotifics}</div>
                    <button role="notificationsBtn" type="button"
                            onClick={() => setShowNotificationsModal(true)}><AiOutlineMail className="navIcon" />
                    </button>
                </li>
                <li><button type="button" onClick={() => navigate("/chat")}><AiOutlineWechat className="navIcon" /></button></li>
                <li>
                    <button type="button" onClick={handleAvatarClick}><FaUserAlt className="navIcon" /></button>
                    {avatarClicked && <LogoutModal visitProfile={visitProfile} logout={logout} />}
                </li>
                <li><button type="button" onClick={() => navigate("/home")}><AiFillHome className="navIcon" /></button></li>
            </ul>
        </nav>
    );
}

export default Navbar;