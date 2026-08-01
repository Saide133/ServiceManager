import { readFileSync, writeFileSync } from 'fs';

class ServiceDAO {
    constructor() {
        const data = readFileSync('./src/data/services.json', 'utf-8');
        this.services = JSON.parse(data);
    }
    
    save() {
        writeFileSync('./src/data/services.json', JSON.stringify(this.services, null, 2));
    }

    getAll() {
        return this.services;
    }

    getById(id) {
        return this.services.find(service => service.id === id) || null;
    }

    create(service) {
        this.services.push(service);
        this.save();
        return service;
    }

    update(id, data){
        const index = this.services.findIndex(service => service.id === id);
        
        if (index === -1) {
            return null;
        }

        this.services[index] = { ...this.services[index], ...data };
        this.save();
        return this.services[index];
    }

    delete(id) {
        const index = this.services.findIndex(service => service.id === id);
        
        if (index === -1) {
            return null;
        }

        const deletedService = this.services.splice(index, 1)[0];
        this.save();
        return deletedService;
    }
}

export default ServiceDAO;