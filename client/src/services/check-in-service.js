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
    getByUser: (name) => {
        return api.get(`${base}/user/${name}`)
    },
    getByVenue: (name) => {
        return api.get(`${base}/venue/${name}`)
    },
    add: (checkIn) => {
        return api.post(base, checkIn)
    },
    update: (checkIn) => {
        return api.put(base, checkIn)
    }
}

export default CheckInService
  
