import { readFileSync } from 'fs'

class ServiceManager {
    constructor() {
        const data = readFileSync('./src/data/services.json', 'utf-8')
        this.services = JSON.parse(data)
    }

    getServices() {
        return this.services
    }

    getServiceById(id) {
        const service = this.services.find(s=> s.id === id)
        if (!service) {
            return null
        }
        return service
    }

    addService(serviceData) {
        const { name, description, duration, price, category, available } = serviceData

        if (!name || !description || !duration || !price || !category || available === undefined) {
            return null
        }

        const newService = {
            id: this.services.length + 1,
            name,
            description,
            duration,
            price,
            category,
            available
        }   

        this.services.push(newService)
        return newService
    }

    updateService(id, updatedData) {
        const index = this.services.findIndex(s => s.id === id)
    
        if (index === -1) {
            return null
        }

        if (updatedData.id) {
            delete updatedData.id
        }

        this.services[index] = { ...this.services[index], ...updatedData }
        return this.services[index]
    }

    deleteService(id) {
        const index = this.services.findIndex(s => s.id === id)
        
        if (index === -1) {
            return null
        }

        const deleted = this.services[index]
        this.services.splice(index, 1)
        return deleted
    }

}

export default ServiceManager