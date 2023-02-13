import React from 'react';
import "./index.css";
import {chatType} from "../../types";
import ActiveChat from "../ActiveChat";

type chatsModalProps = {
    chats: chatType,
}

function ChatsModal({chats, openChat}: any) {
    return (
        <div className="chatsModalBackground">
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