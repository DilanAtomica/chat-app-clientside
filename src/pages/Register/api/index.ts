import axios from "axios";

type registerUserInputsTypes = {
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
}


export const registerUser = (registerUserInputs: registerUserInputsTypes) => {
    return axios.post("http://localhost:3001/users/registerUser", registerUserInputs)
}