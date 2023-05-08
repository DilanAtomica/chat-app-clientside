import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {sendMessageType} from "../types";

const chats = async() => {
        const chatsData = await axios.get(import.meta.env.VITE_REACT_API_URL + "/chats/chatsData", {
            withCredentials: true
        });
        console.log(chatsData.data);
        return chatsData.data;
}
export const useChats = () => {
    return useQuery(["chatsData"], () => chats());
}

const chat = async(chatID: number | null) => {
        if(chatID) {
            const chatData = await axios.get(import.meta.env.VITE_REACT_API_URL + "/chats/chatData", {
                withCredentials: true,
                params: {
                    chatID: chatID
                },
            });
            console.log(chatData.data);
            return chatData.data;
        } else return null;
}
export const useChat = (chatID: number | null) => {
    return useQuery(["chatData"], () => chat(chatID));
}


const message = async(messageData: sendMessageType) => {
    return await axios.post(import.meta.env.VITE_REACT_API_URL + "/chats/message",{messageData}, {withCredentials: true});
}
export const useMessage = () => {
    return useMutation(["messageMutation"], (messageData: sendMessageType) => message(messageData));
}

const leaveChat = async(chatID: number | null) => {
    return await axios.delete(import.meta.env.VITE_REACT_API_URL + "/chats/leaveChat", {
        withCredentials: true,
        params: {
            chatID: chatID,
        }
    });

}
export const useLeaveChat = () => {
    return useMutation(["leaveChatMutation"], (chatID: number | null) => leaveChat(chatID));
}




