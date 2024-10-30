import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email: email, password: password });
}

const getAllUsersApi = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserApi = (data) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUserApi = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } });
}

const editUserApi = (data) => {
    return axios.put('/api/edit-user', data);
}

export default {
    handleLoginApi: handleLoginApi,
    getAllUsersApi: getAllUsersApi,
    createNewUserApi: createNewUserApi,
    deleteUserApi: deleteUserApi,
    editUserApi: editUserApi
}