import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const activeChatQueues = async() => {
    try {
        const activeChatQueuesData = await axios.post("http://localhost:3001/chats/activeChatQueues", {}, {
            withCredentials: true
        });
        if(activeChatQueuesData) {
            console.log(activeChatQueuesData.data);
            return activeChatQueuesData.data;
        } else return null;
    } catch(error) {
        console.log(error);
    }

}

export const useActiveChatQueues = () => {
    return useQuery(["activeChatQueuesData"], () => activeChatQueues());
}

