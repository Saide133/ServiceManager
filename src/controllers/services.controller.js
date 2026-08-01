import { 
    getServices as getServicesService,
    getServiceById as getServiceByIdService,
    createService as createServiceService,
    updateService as updateServiceService,
    deleteService as deleteServiceService
} from '../services/services.service.js'

export const getServices = (req, res) => {
    const { category, available } = req.query
    const services = getServicesService(category, available)
    res.status(200).json({ status: 'success', payload: services })
}

export const getServiceById = (req, res) => {
    const { sid } = req.params
    const service = getServiceByIdService(sid)
    if (!service) {
        return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' })
    }
    res.status(200).json({ status: 'success', payload: service })
}

export const createService = (req, res) => {
    const serviceData = req.body
    const newService = createServiceService(serviceData)
    if (!newService) {
        return res.status(400).json({ status: 'error', message: 'Datos incompletos' })
    }
    res.status(201).json({ status: 'success', payload: newService })
}

export const updateService = (req, res) => {
    const { sid } = req.params
    const updatedData = req.body
    const updatedService = updateServiceService(sid, updatedData)
    if (!updatedService) {
        return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' })
    }
    res.status(200).json({ status: 'success', payload: updatedService })
}

export const deleteService = (req, res) => {
    const { sid } = req.params
    const deletedService = deleteServiceService(sid)
    if (!deletedService) {
        return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' })
    }
    res.status(200).json({ status: 'success', payload: deletedService })
}