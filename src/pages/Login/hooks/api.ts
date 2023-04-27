import axios from 'axios';
import {useMutation} from "@tanstack/react-query";

type loginInputs = {
    email: string,
    password: string,
};

const login = (inputData: loginInputs) => {
    return axios.post("https://chat-app-server-8rto.onrender.com" + '/users/login', inputData, {withCredentials: true});
};

export const useLogin = () => {
    return useMutation(["loginMutation"], (inputData: loginInputs) => login(inputData));
}

