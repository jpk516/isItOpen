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
        return api.get(`/accounts/favorites/${id}`)
    },
    addFavorite: (id, venue) => {
        return api.post(`/accounts/favorites/${id}`, venue)
    },
    deleteFavorite: (id, venue) => {
        return api.delete(`/accounts/favorites/${id}`, venue)
    },
    logOut: () => {
        return api.delete(`/accounts/logout`)
    }
}

export default AccountService
  
