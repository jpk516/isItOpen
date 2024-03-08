import api from './axios-service.js'

const base = '/check-ins'

const CheckInService = {
    getAll: () => {
        return api.get(base)
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
        return api.post(base, {
            checkIn: checkIn
        })
    },
    update: (checkIn) => {
        return api.put(base, {
            checkIn: checkIn
        })
    }
}

export default CheckInService
  
