import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {sendMessageType} from "../types";

const chats = async() => {
        const chatsData = await axios.post("http://localhost:3001/chats/chatsData",{}, {
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
            const chatData = await axios.post(process.env.API_URL + "/chats/chatData",{chatID}, {
                withCredentials: true
            });
            console.log(chatData.data);
            return chatData.data;
        } else return null;
}
export const useChat = (chatID: number | null) => {
    return useQuery(["chatData"], () => chat(chatID));
}


const message = async(messageData: sendMessageType) => {
    return await axios.post(process.env.API_URL + "/chats/message",{messageData}, {withCredentials: true});
}
export const useMessage = () => {
    return useMutation(["messageMutation"], (messageData: sendMessageType) => message(messageData));
}

const leaveChat = async(chatID: number | null) => {
    return await axios.post(process.env.API_URL + "/chats/leaveChat",{chatID}, {withCredentials: true});

}
export const useLeaveChat = () => {
    return useMutation(["leaveChatMutation"], (chatID: number | null) => leaveChat(chatID));
}




