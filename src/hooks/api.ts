import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const authUser = async() => {
    try {
        const tokenData = await axios.post("http://localhost:3001/users/auth",{}, {
            withCredentials: true
        });
        console.log(tokenData.data);
        return tokenData.data;
    } catch(error) {
        console.log(error);
    }

}
export const useAuthUser = () => {
    return useQuery(["tokenData"], () => authUser());
}

const userDetails = async() => {
    try {
        const userDetailsData = await axios.post("http://localhost:3001/users/userDetails",{}, {
            withCredentials: true
        });
        console.log(userDetailsData.data);
        if(userDetailsData.data) return userDetailsData.data;
        else return null;
    } catch(error) {
        console.log(error);
    }

}
export const useUserDetails = () => {
    return useQuery(["userDetailsData"], () => userDetails());
}




