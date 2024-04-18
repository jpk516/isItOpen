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
    register: (user) => {
        return api.post(`/accounts/register`, user)
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
    getFavorites: (id) => {
        return api.get(`/accounts/favorites/`)
    },
    addFavorite: (venue) => {
        console.log(venue)
        return api.post(`/accounts/favorites/`, venue)
    },
    deleteFavorite: (venue) => {
        return api.delete(`/accounts/favorites/`, venue)
    },
    logOut: () => {
        return api.delete(`/accounts/logout`)
    }
}

export default AccountService
  
