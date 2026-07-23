import { Router } from 'express'
import ServiceManager from '../managers/ServiceManager.js'

const router = Router()
const manager = new ServiceManager()

router.get('/', (req, res) => {
    const { category, available } = req.query
    const services = manager.getServices(category, available)
    res.status(200).json({ status: 'success', payload: services })
})

router.get('/:sid', (req, res) => {
    const { sid } = req.params
    const service = manager.getServiceById(sid)
    if (!service) {
        return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' })
    }
    res.status(200).json({ status: 'success', payload: service })
})

router.post('/', (req, res) => {
    const serviceData = req.body
    const newService = manager.addService(serviceData)
    if (!newService) {
        return res.status(400).json({ status: 'error', message: 'Datos incompletos' })
    }
    res.status(201).json({ status: 'success', payload: newService })
})

router.put('/:sid', (req, res) => {
    const { sid } = req.params
    const updatedData = req.body
    const updatedService = manager.updateService(sid, updatedData)
    if (!updatedService) {
        return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' })
    }
    res.status(200).json({ status: 'success', payload: updatedService })
})

router.delete('/:sid', (req, res) => {
    const { sid } = req.params
    const deletedService = manager.deleteService(sid)
    if (!deletedService) {
        return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' })
    }
    res.status(200).json({ status: 'success', payload: deletedService })
})

export default router