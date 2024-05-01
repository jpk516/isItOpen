import api from './axios-service.js'

const base = '/achievements'

const AchievementService = {
    getAll: () => {
        return api.get(base)  
    },
    get: (id) => {
        return api.get(`${base}/${id}`)
    },
    add: (achievement) => {
        return api.post(base, achievement)
    },
    update: (achievement) => {
        return api.put(base, achievement)
    },
    delete: (id) => {
        return api.delete(`${base}/${id}`)
    }
}

export default AchievementService
