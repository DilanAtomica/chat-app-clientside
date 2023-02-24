import React from 'react';
import "./index.css";
import {chatType} from "../../types";
import ActiveChat from "../ActiveChat";

function ChatsModal({chats, openChat, hideChatsModal}: any) {

    const onBackgroundClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target instanceof HTMLElement) {
            if(e.target.classList.contains("chatsModalBackground")) hideChatsModal();
        }
    };

    return (
        <div role="chatsModal" onClick={onBackgroundClick} className="chatsModalBackground">
            <div className="chatsModal">
                {chats?.map((chat: chatType) => (
                    <ActiveChat key={chat.chatID} chatID={chat.chatID} seriesImage={chat.seriesImage} seriesName={chat.seriesName}
                                seriesSeason={chat.seriesSeason} seriesEpisode={chat.seriesEpisode} otherUserName={chat.otherUserName}
                                created_at={chat.created_at} onClick={() => openChat(chat.chatID)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ChatsModal;