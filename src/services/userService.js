import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email: email, password: password });
}

const getAllUsersApi = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

export default {
    handleLoginApi: handleLoginApi,
    getAllUsersApi: getAllUsersApi
}