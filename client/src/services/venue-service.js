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
    isOpen: (id) => {
        return api.get(`places/open/id/${id}`)
    },
    add: (venue) => {
        return api.post(base, venue)
    },
    update: (venue) => {
        return api.put(base, venue)
    }
}

export default VenueService
  
