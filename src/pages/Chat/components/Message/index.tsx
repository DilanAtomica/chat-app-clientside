import React, {ReactNode} from 'react';
import "./index.css";

type messageType = {
    messageID: number,
    messageSent: boolean
    createdAt: Date,
    children: ReactNode,
}

function Message({children, messageSent, createdAt}: messageType) {
    return (
        <div style={{justifyContent: messageSent ? "flex-end" : "flex-start"}} className="chatWindowMessageContainer">
            <div className="chatWindowMessage">
                <p className="message"
                   style={{backgroundColor: messageSent ? "rgba(15,98,254, 1)" : "rgba(239,239,239, 0.8)",
                       color: messageSent ? "white" : "black",
                       borderRadius: messageSent ? "15px 15px 0 15px" : "15px 15px 15px 0",
                    margin: "0 0 0.5rem 1rem"}}>
                    {children}
                </p>
                <p className="messageDate" style={{margin: "0 0 1rem 1rem"}}>Feb 27, 2016, 10:57 PM · Sent</p>
            </div>
        </div>
    );
}

/*
<div style={{justifyContent: "flex-end"}} className="chatWindowMessageContainer">
                            <div className="chatWindowMessage">
                                <p className="message">What are your thoughts on bulletproof-react by alan2207?</p>
                                <p className="messageDate" style={{margin: "0 0 1rem 1rem"}}>Feb 27, 2016, 10:57 PM · Sent</p>
                            </div>
                        </div>
 */

export default Message;