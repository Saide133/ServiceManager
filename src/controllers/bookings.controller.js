import ServiceManager from '../managers/ServiceManager.js'
import BookingManager from '../managers/BookingManager.js'

const serviceManager = new ServiceManager()
const bookingManager = new BookingManager(serviceManager)

export const createBooking = (req, res) => {
    const bookingData = req.body
    const newBooking = bookingManager.createBooking(bookingData)
    if (!newBooking) {
        return res.status(400).json({ status: 'error', message: 'Datos incompletos' })
    }
    res.status(201).json({ status: 'success', payload: newBooking })
}

export const getBookingById = (req, res) => {
    const { bid } = req.params
    const booking = bookingManager.getBookingById(bid)
    if (!booking) {
        return res.status(404).json({ status: 'error', message: 'Reserva no encontrada' })
    }
    res.status(200).json({ status: 'success', payload: booking })
}

export const addServiceToBooking = (req, res) => {
    const { bid, sid } = req.params
    const updatedBooking = bookingManager.addServiceToBooking(bid, sid)
    if (!updatedBooking) {
        return res.status(404).json({ status: 'error', message: 'Reserva o servicio no encontrado' })
    }
    res.status(200).json({ status: 'success', payload: updatedBooking })
}

export const updateBooking = (req, res) => {
    const { bid } = req.params
    const updatedData = req.body
    const updatedBooking = bookingManager.updateBooking(bid, updatedData)
    if (!updatedBooking) {
        return res.status(404).json({ status: 'error', message: 'Reserva no encontrada' })
    }
    res.status(200).json({ status: 'success', payload: updatedBooking })
}

export const deleteBooking = (req, res) => {
    const { bid } = req.params
    const deletedBooking = bookingManager.deleteBooking(bid)
    if (!deletedBooking) {
        return res.status(404).json({ status: 'error', message: 'Reserva no encontrada' })
    }
    res.status(200).json({ status: 'success', payload: deletedBooking })
}