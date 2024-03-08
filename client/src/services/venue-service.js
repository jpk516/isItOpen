import api from './axios-service.js'

const base = '/venues'

const VenueService = {
    getAll: () => {
        return api.get(base)
    },
    getSelectList: () => {
        return api.get(`${base}/select-list`)
    },
    count: () => {
        return api.get(`${base}/count`)
    },
    get: (name) => {
        return api.get(`${base}/${name}`)
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

export default VenueService
  
