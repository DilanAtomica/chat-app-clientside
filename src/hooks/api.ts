import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const authUser = async() => {
    console.log("hey");
    console.log(import.meta.env.VITE_REACT_API_URL);
        const tokenData = await axios.post(import.meta.env.VITE_REACT_API_URL + "/users/auth",{}, {
            withCredentials: true
        });
        console.log(tokenData.data);
        return tokenData.data;

}
export const useAuthUser = () => {
    return useQuery(["tokenData"], () => authUser());
}

const userDetails = async() => {
        const userDetailsData = await axios.post(import.meta.env.VITE_REACT_API_URL + "/users/userDetails",{}, {
            withCredentials: true
        });
        console.log(userDetailsData.data);
        if(userDetailsData.data) return userDetailsData.data;
        else return null;
}
export const useUserDetails = () => {
    return useQuery(["userDetailsData"], () => userDetails());
}




