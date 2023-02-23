import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {sendMessageType} from "../types";

const chats = async() => {
    try {
        const chatsData = await axios.post("http://localhost:3001/chats/chatsData",{}, {
            withCredentials: true
        });
        console.log(chatsData.data);
        return chatsData.data;
    } catch(error) {
        console.log(error);
    }

}
export const useChats = () => {
    return useQuery(["chatsData"], () => chats());
}

const chat = async(chatID: number | null) => {
    try {
        if(chatID) {
            const chatData = await axios.post("http://localhost:3001/chats/chatData",{chatID}, {
                withCredentials: true
            });
            console.log(chatData.data);
            return chatData.data;
        } else return null;
    } catch(error) {
        console.log(error);
    }

}
export const useChat = (chatID: number | null) => {
    return useQuery(["chatData"], () => chat(chatID));
}


const message = async(messageData: sendMessageType) => {
    try {
            return await axios.post("http://localhost:3001/chats/message",{messageData}, {withCredentials: true});
    } catch(error) {
        console.log(error);
    }

}
export const useMessage = () => {
    return useMutation(["messageMutation"], (messageData: sendMessageType) => message(messageData));
}

const leaveChat = async(chatID: number | null) => {
    try {
        return await axios.post("http://localhost:3001/chats/leaveChat",{chatID}, {withCredentials: true});
    } catch(error) {
        console.log(error);
    }

}
export const useLeaveChat = () => {
    return useMutation(["leaveChatMutation"], (chatID: number | null) => leaveChat(chatID));
}




