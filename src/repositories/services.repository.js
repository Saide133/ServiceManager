import { randomUUID } from 'crypto';

class ServiceRepository {
    constructor(dao) {
        this.dao = dao; 
    }

    getAll(){
        return this.dao.getAll();
    }

    getById(id){
        return this.dao.getById(id);
    }

    create(serviceData) {
        return this.dao.create({ ...serviceData, id: randomUUID() });
    }

    update(id, data){
        return this.dao.update(id, data);
    }

    delete(id) {
        return this.dao.delete(id);
    }

}

export default ServiceRepository;