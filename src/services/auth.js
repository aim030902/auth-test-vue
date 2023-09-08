import axios from './axios';

const AuthService = {
    register(userData) {
        return axios.post('/users', { user: userData});
    },

    login(userData) {
        return axios.post('/users/login', { user: userData })
    },
    getUser() {
        return axios.get('/user')
    }
}

export default AuthService;