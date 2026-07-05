import express from 'express'
import config from './config/env.config.js'
import ServiceManager from './managers/ServiceManager.js'

const app = express()
const manager = new ServiceManager()

app.use(express.json())

app.get('/services', (req, res) => {
    const services = manager.getServices()
    res.json(services)
})

app.get('/services/:id', (req, res) => {
    const service = manager.getServiceById(req.params.id)
    if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' })
    }
    res.json(service)
})

app.post('/services', (req, res) => {
    const newService = manager.addService(req.body)
    if (!newService) {
        return res.status(400).json({ error: 'Datos incompletos' })
    }
    res.status(201).json(newService)
})

app.put('/services/:id', (req, res) => {
    const updated = manager.updateService(req.params.id, req.body)
    if (!updated) {
        return res.status(404).json({ error: 'Servicio no encontrado' })
    }
    res.json(updated)
})

app.delete('/services/:id', (req, res) => {
    const deleted = manager.deleteService(req.params.id)
    if (!deleted) {
        return res.status(404).json({ error: 'Servicio no encontrado' })
    }
    res.json(deleted)
})

app.listen(config.port, () => {
    console.log(`Servidor escuchando en el puerto ${config.port}`)
})

export default app