import api from '../services/axios-service.js'

const AccountService = {
    isAuthenticated: () => {
        return api.get(`account/`)
    },
    count: () => {
        return api.get(`/account/count`)
    },
    register: (userName, password) => {
        return api.post(`/account/register`, {
            username: userName,
            password: password
        })
    },
    authenticate: (userName, password) => {
        return api.post(`/account/login`, {
            username: userName,
            password: password
        })
    },
    logOut: () => {
        return api.delete(`/account/logout`)
    }
}

export default AccountService
  
