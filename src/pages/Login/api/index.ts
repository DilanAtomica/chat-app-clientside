import axios from 'axios';

type loginInputs = {
    email: string,
    password: string,
};

export const login = (data: loginInputs) => {
    return axios.post('http://localhost:3001/users/login', data, {withCredentials: true});
};

