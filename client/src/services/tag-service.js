import api from './axios-service.js'

const base = '/tags'

const TagService = {
    getAll: () => {
        return api.get(base)  
    },
    get: (name) => {
        return api.get(`${base}/${name}`)
    },
    add: (tag) => {
        return api.post(base, tag)
    },
    update: (tag) => {
        return api.put(base, tag)
    }
}

export default TagService
  
