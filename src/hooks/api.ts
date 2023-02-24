import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const authUser = async() => {
        const tokenData = await axios.post("http://localhost:3001/users/auth",{}, {
            withCredentials: true
        });
        console.log(tokenData.data);
        return tokenData.data;

}
export const useAuthUser = () => {
    return useQuery(["tokenData"], () => authUser());
}

const userDetails = async() => {
        const userDetailsData = await axios.post("http://localhost:3001/users/userDetails",{}, {
            withCredentials: true
        });
        console.log(userDetailsData.data);
        if(userDetailsData.data) return userDetailsData.data;
        else return null;
}
export const useUserDetails = () => {
    return useQuery(["userDetailsData"], () => userDetails());
}




