import React, {useEffect, useState} from 'react';
import "./index.css";
import Navbar from "../../components/Navbar";
import {AiOutlineMessage} from "react-icons/ai";
import Button from "../../components/Form/Button";
import {useChats, useChat, useMessage, useLeaveChat} from "./hooks/api";
import ActiveChat from "./components/ActiveChat";
import {chatType, messageType} from "./types";
import Message from "./components/Message";
import LoadingScreen from "../../components/LoadingScreen";
import useScreenWidth from "../../stores/screenWidth";
import ChatsModal from "./components/ChatsModal";

function ChatPage() {

    const {data, isFetching: isFetchingActiveChats} = useChats();
    const [currentChatID, setCurrentChatID] = useState<null | number>(null);
    const {data: currentChatData, refetch, isFetching: isFetchingCurrentChat} = useChat(currentChatID);
    const {mutate} = useMessage();
    const {mutate: leaveChatMutation} = useLeaveChat();

    const {screenWidth} = useScreenWidth();

    const [trigger, setTrigger] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [showChatsModal, setShowChatsModal] = useState<boolean>(false);

    useEffect(() => {
        if(currentChatID) refetch();
    }, [currentChatID, trigger]);

    const openChat = (chatID: number) => {
        setCurrentChatID(chatID);
        setShowChatsModal(false);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(currentChatID) {
            mutate({chatID: currentChatID, text: inputValue});
            setInputValue("");
            setTrigger(!trigger);
        }
    }

    const hideChatsModal = () => setShowChatsModal(false);

    const leaveChat = () => {
        leaveChatMutation(currentChatID);
        refetch();
    }


    return (
        <main className="chatPage">
            <Navbar />
            {showChatsModal && <ChatsModal chats={data} openChat={openChat} hideChatsModal={hideChatsModal} />}
            {(isFetchingCurrentChat || isFetchingActiveChats) && <LoadingScreen />}
            <div className="chatContainer">
                {screenWidth > 900 &&
                    <div className="activeChats">
                        <header>
                            <h1>Chats</h1>
                        </header>
                        {data?.map((chat: chatType) => (
                            <ActiveChat key={chat.chatID} chatID={chat.chatID} seriesImage={chat.seriesImage} seriesName={chat.seriesName}
                                        seriesSeason={chat.seriesSeason} seriesEpisode={chat.seriesEpisode} otherUserName={chat.otherUserName}
                                        created_at={chat.created_at} onClick={() => openChat(chat.chatID)}
                            />
                        ))}
                    </div>
                }

                <div className="chatWindow">
                    <header>
                        {currentChatData &&
                            <><img alt={currentChatData.seriesName} src={"https://image.tmdb.org/t/p/w500" + currentChatData?.seriesImage}/>
                                <ul>
                                    <li>{currentChatData.seriesName}</li>
                                    <li>· Season {currentChatData.seriesSeason} · Episode {currentChatData.seriesEpisode} ·</li>
                                    <li>Chatting with {currentChatData?.otherUserName}</li>
                                </ul>
                            </>}
                        {screenWidth < 900 &&
                            <Button onClick={() => setShowChatsModal(true)} margin={"0"} buttonType={"button"}
                                    disabled={false} width={"max-content"}>Chats</Button>
                        }
                    </header>

                    <div className="chatWindowMessages">
                        {currentChatData?.messages?.map((message: messageType) => (
                            <Message key={message.messageID} dateSent={message.dateSent} messageID={message.messageID}
                                     messageSent={message.messageSent}>
                                {message.message}
                            </Message>
                        ))}
                    </div>

                    {currentChatID &&
                        <form onSubmit={onSubmit} className="chatWindowInput">
                            <AiOutlineMessage id="chatBubbleIcon" />
                            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Send a message..." />
                            <Button buttonType={"submit"} disabled={false} width={"max-content"}>Send</Button>
                        </form>}

                    {currentChatID && <button onClick={leaveChat} type="button">Leave chat</button>}
                </div>
            </div>
        </main>
    );
}

export default ChatPage;