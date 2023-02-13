import React, {useEffect, useState} from 'react';
import "./index.css";
import Navbar from "../../components/Navbar";
import {AiOutlineMessage} from "react-icons/ai";
import Button from "../../components/Form/Button";
import {useChats, useChat, useMessage} from "./hooks/api";
import ActiveChat from "./components/ActiveChat";
import {chatType, messageType} from "./types";
import Message from "./components/Message";

function ChatPage() {

    const {data} = useChats();
    const [currentChatID, setCurrentChatID] = useState<null | number>(null);
    const {data: currentChatData, refetch} = useChat(currentChatID);
    const {mutate} = useMessage();

    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if(currentChatID) refetch();
    }, [currentChatID]);

    const openChat = (chat: chatType) => {
        setCurrentChatID(chat.chatID);
    }

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(currentChatID) mutate({chatID: currentChatID, text: inputValue});
        await refetch();
        setInputValue("");
    }

    return (
        <div className="chatPage">
            <Navbar />
            <div className="chatContainer">
                <div className="activeChats">
                    <header>
                        <h1>Chats</h1>
                    </header>
                    {data?.map((chat: chatType) => (
                        <ActiveChat key={chat.chatID} chatID={chat.chatID} seriesImage={chat.seriesImage} seriesName={chat.seriesName}
                                    seriesSeason={chat.seriesSeason} seriesEpisode={chat.seriesEpisode} otherUserName={chat.otherUserName}
                                    created_at={chat.created_at} onClick={() => openChat(chat)}
                        />
                    ))}

                </div>

                <div className="chatWindow">
                    <header>

                        {currentChatData &&
                            <><img alt={currentChatData.seriesName} src={"https://image.tmdb.org/t/p/w500" + currentChatData?.seriesImage}/>
                                <ul>
                                    <li>{currentChatData.chatID}</li>
                                    <li>· Season {currentChatData.seriesSeason} · Episode {currentChatData.seriesEpisode} ·</li>
                                    <li>Chatting with {currentChatData?.otherUserName}</li>
                                </ul>
                            </>}
                    </header>
                    <div className="chatWindowMessages">
                        {currentChatData?.messages?.map((message: messageType) => (
                            <Message key={message.messageID} createdAt={message.created_at} messageID={message.messageID}
                                     messageSent={message.messageSent}>
                                {message.message}
                            </Message>
                        ))}

                    </div>
                    <form onSubmit={onSubmit} className="chatWindowInput">
                        <AiOutlineMessage id="chatBubbleIcon" />
                        <input onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Send a message..." />
                        <Button buttonType={"submit"} disabled={false} width={"max-content"}>Send</Button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default ChatPage;