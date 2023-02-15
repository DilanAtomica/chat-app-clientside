import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {openNotificTypes} from "../types";

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

const readNotification = async(openNotificData: openNotificTypes) => {
    try {
        return await axios.post("http://localhost:3001/chats/readNotification",{openNotificData}, {withCredentials: true});
    } catch(error) {
        console.log(error);
    }

}
export const useReadNotification = () => {
    return useMutation(["readNotificationMutation"], (openNotificData: openNotificTypes) => readNotification(openNotificData));
}