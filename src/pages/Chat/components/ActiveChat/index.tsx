import React from 'react';
import "./index.css";
import {chatType} from "../../types";

function ActiveChat({chatID, seriesImage, seriesName, seriesSeason, seriesEpisode, otherUserName, created_at, onClick}: chatType) {
    return (
        <button role="activeChatBtn" onClick={onClick} key={chatID} className="activeChat">
            <img alt={seriesName} src={"https://image.tmdb.org/t/p/w500" + seriesImage} />
            <ul>
                <li>{seriesName}</li>
                <li>Season {seriesSeason} · Episode {seriesEpisode}</li>
                <li>Chatting with {otherUserName}</li>
            </ul>
        </button>
    );
}

export default ActiveChat;