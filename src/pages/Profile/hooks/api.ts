import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";

const activeChatQueues = async() => {
        const activeChatQueuesData = await axios.get(import.meta.env.VITE_REACT_API_URL + "/chats/activeChatQueues", {
            withCredentials: true
        });
        if(activeChatQueuesData) {
            console.log(activeChatQueuesData.data);
            return activeChatQueuesData.data;
        } else return null;
}

export const useActiveChatQueues = () => {
    return useQuery(["activeChatQueuesData"], () => activeChatQueues());
}


const deleteChatQueue = (chatQueueID: number) => {
    return axios.delete(import.meta.env.VITE_REACT_API_URL + "/chats/deleteChatQueue", {
        withCredentials: true,
        params: {
            chatQueueID: chatQueueID,
        }
    });
};

export const useDeleteChatQueue = () => {
    return useMutation(["deleteChatQueueMutation"], (chatQueueID: number) => deleteChatQueue(chatQueueID));
}



