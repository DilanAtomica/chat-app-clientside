import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const notifications = async() => {
    try {
        const notificationsData = await axios.post("http://localhost:3001/chats/notifications",{}, {
            withCredentials: true
        });
        console.log(notificationsData.data);
        return notificationsData.data;
    } catch(error) {
        console.log(error);
    }

}
export const useNotifications = () => {
    return useQuery(["notificationsData"], () => notifications());
}