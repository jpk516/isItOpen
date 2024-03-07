import api from './axios-service.js'

const base = '/check-in'

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
    add: (venue) => {
        return api.post(base, {
            venue: venue
        })
    },
    update: (venue) => {
        return api.put(base, {
            venue: venue
        })
    }
}

export default CheckInService
  
