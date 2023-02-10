import React from 'react';
import "./index.css";
import Navbar from "../../components/Navbar";
import {AiOutlineMessage} from "react-icons/ai";
import Button from "../../components/Form/Button";

function ChatPage() {

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div className="chatPage">
            <Navbar />
            <div className="chatContainer">
                <div className="activeChats">
                    <header>
                        <h1>Chats</h1>
                    </header>
                    <div className="activeChat">
                        <img src={"https://image.tmdb.org/t/p/w500/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg"} />
                            <ul>
                                <li>Game of Thrones</li>
                                <li>Season 9 · Episode 5</li>
                                <li>Chatting with Dilan</li>
                            </ul>
                    </div>
                    <div className="activeChat">
                        <img src={"https://image.tmdb.org/t/p/w500/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg"} />
                        <ul>
                            <li>Game of Thrones</li>
                            <li>Season 9 · Episode 5</li>
                            <li>Chatting with Dilan</li>
                        </ul>
                    </div>
                </div>

                <div className="chatWindow">
                    <header>
                        <img src={"https://image.tmdb.org/t/p/w500/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg"} />
                        <ul>
                            <li>Game of Thrones</li>
                            <li>· Season 9 · Episode 5 ·</li>
                            <li>Chatting with Dilan</li>
                        </ul>
                    </header>
                    <div className="chatWindowMessages">
                        <div style={{justifyContent: "flex-end"}} className="chatWindowMessageContainer">
                            <div className="chatWindowMessage">
                                <p className="message">What are your thoughts on bulletproof-react by alan2207?</p>
                                <p className="messageDate" style={{margin: "0 0 1rem 1rem"}}>Feb 27, 2016, 10:57 PM · Sent</p>
                            </div>
                        </div>

                        <div style={{justifyContent: "flex-start"}} className="chatWindowMessageContainer">
                            <div className="chatWindowMessage">
                                <p className="message" style={{backgroundColor: "rgba(239,239,239, 0.8)", color: "black", borderRadius: "15px 15px 15px 0",
                                    margin: "0 0 0.5rem 1rem"}}>
                                    What are your thoughts on bulletproof-react by alan2207?
                                </p>
                                <p className="messageDate" style={{margin: "0 0 1rem 1rem"}}>Feb 27, 2016, 10:57 PM · Sent</p>
                            </div>
                        </div>

                    </div>
                    <form onSubmit={handleOnSubmit} className="chatWindowInput">
                        <AiOutlineMessage id="chatBubbleIcon" />
                        <input type="text" placeholder="Send a message..." />
                        <Button buttonType={"submit"} disabled={false} width={"max-content"}>Send</Button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default ChatPage;