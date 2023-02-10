import {useQuery} from "@tanstack/react-query";
import axios from "axios";

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
export const useSearchResult = () => {
    return useQuery(["chatsData"], () => chats());
}

