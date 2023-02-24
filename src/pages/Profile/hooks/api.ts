import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";

const activeChatQueues = async() => {
        const activeChatQueuesData = await axios.post("http://localhost:3001/chats/activeChatQueues", {}, {
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
    return axios.post("http://localhost:3001/chats/deleteChatQueue", {chatQueueID}, {withCredentials: true});
};

export const useDeleteChatQueue = () => {
    return useMutation(["deleteChatQueueMutation"], (chatQueueID: number) => deleteChatQueue(chatQueueID));
}



