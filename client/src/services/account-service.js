import api from '../services/axios-service.js'

const AccountService = {
    isAuthenticated: () => {
        return api.get(`accounts/authenticated`)
    },
    getAll: () => {
        return api.get(`/accounts`)
    },
    count: () => {
        return api.get(`/accounts/count`)
    },
    register: (userName, password) => {
        return api.post(`/accounts/register`, {
            username: userName,
            password: password
        })
    },
    update: (user) => {
        return api.put(`/accounts/`, user)
    },
    authenticate: (userName, password) => {
        return api.post(`/accounts/login`, {
            username: userName,
            password: password
        })
    },
    logOut: () => {
        return api.delete(`/accounts/logout`)
    }
}

export default AccountService
  
