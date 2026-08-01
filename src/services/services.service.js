import ServiceDAO from '../dao/services.dao.js'
import ServiceRepository from '../repositories/services.repository.js'

const dao = new ServiceDAO()
const repository = new ServiceRepository(dao)

export const getServices = (category, available) => {
    let result = repository.getAll()

    if (category) {
        result = result.filter(s => s.category === category)
    }
    if (available !== undefined) {
        const isAvailable = available === 'true' || available === true
        result = result.filter(s => s.available === isAvailable)
    }
    return result
}

export const getServiceById = (id) => {
    return repository.getById(id)
}

export const createService = (serviceData) => {
    const { name, description, duration, price, category, available } = serviceData

    if (!name || !description || !duration || !price || !category || available === undefined) {
        return null
    }
    return repository.create(serviceData)
}

export const updateService = (id, data) => {
    if (data.id) {
        delete data.id
    }
    return repository.update(id, data)
}

export const deleteService = (id) => {
    return repository.delete(id)
}