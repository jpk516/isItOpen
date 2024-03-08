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
        return api.post(base, {
            tag: tag
        })
    },
    update: (tag) => {
        return api.put(base, {
            tag: tag
        })
    }
}

export default TagService
  
