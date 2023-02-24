import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {openNotificTypes} from "../types";

const notifications = async() => {
        const notificationsData = await axios.post("http://localhost:3001/chats/notifications",{}, {
            withCredentials: true
        });
        console.log(notificationsData.data);
        return notificationsData.data;
}
export const useNotifications = () => {
    return useQuery(["notificationsData"], () => notifications());
}

const readNotification = async(openNotificData: openNotificTypes) => {
        return await axios.post("http://localhost:3001/chats/readNotification",{openNotificData}, {withCredentials: true});
}

export const useReadNotification = () => {
    return useMutation(["readNotificationMutation"], (openNotificData: openNotificTypes) => readNotification(openNotificData));
}

const logout = async() => {
        return await axios.post("http://localhost:3001/users/logout",{}, {withCredentials: true});
}

export const useLogout = () => {
    return useMutation(["logoutMutation"], () => logout());
}