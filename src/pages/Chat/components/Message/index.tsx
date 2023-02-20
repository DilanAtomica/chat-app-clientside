import React, {ReactNode} from 'react';
import "./index.css";

type messageType = {
    messageID: number,
    messageSent: boolean
    dateSent: string,
    children: ReactNode,
}

function Message({children, messageSent, dateSent}: messageType) {
    return (
        <div role="message" style={{justifyContent: messageSent ? "flex-end" : "flex-start"}} className="chatWindowMessageContainer">
            <div className="chatWindowMessage">
                <p role="msgText" className="message"
                   style={{
                       backgroundColor: messageSent ? "rgba(15,98,254, 1)" : "rgba(239,239,239, 0.8)",
                       color: messageSent ? "white" : "black",
                       borderRadius: messageSent ? "15px 15px 0 15px" : "15px 15px 15px 0",
                       margin: "0 0 0.5rem 1rem"
                   }}>
                    {children}
                </p>
                <p role="dateSent" className="messageDate" style={{margin: "0 0 1rem 1rem"}}>{dateSent}</p>
            </div>
        </div>
    );
}
export default Message;