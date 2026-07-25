import { Router } from 'express'
import ServiceManager from '../managers/ServiceManager.js'
import BookingManager from '../managers/BookingManager.js'

const router = Router()
const serviceManager = new ServiceManager()
const bookingManager = new BookingManager(serviceManager)

router.post('/', (req, res) => {
    const bookingData = req.body
    const newBooking = bookingManager.createBooking(bookingData)
    if (!newBooking) {
        return res.status(400).json({ status: 'error', message: 'Datos incompletos' })
    }
    res.status(201).json({ status: 'success', payload: newBooking })
})

router.get('/:bid', (req, res) => {
    const { bid } = req.params
    const booking = bookingManager.getBookingById(bid)
    if (!booking) {
        return res.status(404).json({ status: 'error', message: 'Reserva no encontrada' })
    }
    res.status(200).json({ status: 'success', payload: booking })
})

router.post('/:bid/services/:sid', (req, res) => {
    const { bid, sid } = req.params
    const updatedBooking = bookingManager.addServiceToBooking(bid, sid)
    if (!updatedBooking) {
        return res.status(404).json({ status: 'error', message: 'Reserva o servicio no encontrado' })
    }
    res.status(200).json({ status: 'success', payload: updatedBooking })
})

export default router