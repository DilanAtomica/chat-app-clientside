import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const authUser = async() => {
    try {
        const tokenData = await axios.post("http://localhost:3001/users/auth",{}, {
            withCredentials: true
        });
        console.log(tokenData);
        return tokenData;
    } catch(error) {
        console.log(error);
    }

}
export const useAuthUser = () => {
    return useQuery(["tokenData"], () => authUser());
}




