import axios from "axios";
import {useMutation} from "@tanstack/react-query";

type registerUserInputsTypes = {
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
}


const registerUser = (registerUserInputs: registerUserInputsTypes) => {
    return axios.post(process.env.API_URL + "/users/registerUser", registerUserInputs, {withCredentials: true})
}

export const useRegister = () => {
    return useMutation(["registerMutation"], (inputData: registerUserInputsTypes) => registerUser(inputData));
}

