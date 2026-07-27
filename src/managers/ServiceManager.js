import { readFileSync, writeFileSync } from 'fs'
import { randomUUID } from 'crypto'

class ServiceManager {
    constructor() {
        const data = readFileSync('./src/data/services.json', 'utf-8')
        this.services = JSON.parse(data)
    }

    getServices(category, available) {
        let result = this.services

        if (category) {
            result = result.filter(s => s.category === category)
        }

        if (available !== undefined) {
            const isAvailable = available === 'true' || available === true
            result = result.filter(s => s.available === isAvailable)
        }

        return result
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
            id: randomUUID(),
            name,
            description,
            duration,
            price,
            category,
            available
        }   

        this.services.push(newService)
        this.saveServices()
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
        this.saveServices()
        return this.services[index]
    }

    deleteService(id) {
        const index = this.services.findIndex(s => s.id === id)
        
        if (index === -1) {
            return null
        }

        const deletedService = this.services.splice(index, 1)[0]
        this.saveServices()
        return deletedService
    } 

    saveServices() {
        writeFileSync('./src/data/services.json', JSON.stringify(this.services, null, 2))
    }


}

export default ServiceManager