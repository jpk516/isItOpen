import api from './axios-service.js'

const base = '/check-ins'

const CheckInService = {
    getAll: () => {
        return api.get(base)
    },
    getRecent: (limit) => {
        return api.get(`${base}/recent/${limit}`)
    },
    count: () => {
        return api.get(`${base}/count`)
    },
    getByUser: (id) => {
        return api.get(`${base}/user/${id}`)
    },
    getByVenue: (id) => {
        return api.get(`${base}/venue/${id}`)
    },
    add: (checkIn) => {
        return api.post(base, checkIn)
    },
    update: (checkIn) => {
        return api.put(base, checkIn)
    },
    vote: (id, vote) => {
        return api.post(`${base}/vote/${id}`, vote)
    },
}

export default CheckInService
  
