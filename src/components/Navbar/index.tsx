import React from 'react';
import "./index.css";
import Logo from "../../images/logo.jpg";
import {useNavigate} from "react-router-dom";
import {AiOutlineWechat} from "react-icons/ai";
import {FaUserAlt} from "react-icons/fa"
import {AiFillHome} from "react-icons/ai";


function Navbar() {

    const navigate = useNavigate();

    return (
        <nav>
            <button><img onClick={() => navigate("/home")} alt="logo" src={Logo} /></button>
            <ul>
                <li><button><AiOutlineWechat onClick={() => navigate("/chat")} className="navIcon" /></button></li>
                <li><button><FaUserAlt onClick={() => navigate("/profile")} className="navIcon" /></button></li>
                <li><button><AiFillHome onClick={() => navigate("/home")} className="navIcon" /></button></li>
            </ul>
        </nav>
    );
}

export default Navbar;