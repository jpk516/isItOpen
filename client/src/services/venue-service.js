import api from './axios-service.js'

const base = '/venues/'

const VenueService = {
    getAll: () => {
        return api.get(base)
    },
    count: () => {
        return api.get(`${base}count`)
    },
    get: (name) => {
        return api.get(`${base}${name}`)
    },
    add: (character) => {
        return api.post(base, {
            character: character
        })
    },
    update: (character) => {
        return api.put(base, {
            character: character
        })
    }
}

export default VenueService
  
