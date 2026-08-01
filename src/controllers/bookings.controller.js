import {
    createBooking as createBookingService,
    getBookingById as getBookingByIdService,
    addServiceToBooking as addServiceToBookingService,
    updateBooking as updateBookingService,
    deleteBooking as deleteBookingService
} from '../services/bookings.service.js'

export const createBooking = (req, res) => {
    const bookingData = req.body
    const newBooking = createBookingService(bookingData)
    if (!newBooking) {
        return res.status(400).json({ status: 'error', message: 'Datos incompletos' })
    }
    res.status(201).json({ status: 'success', payload: newBooking })
}

export const getBookingById = (req, res) => {
    const { bid } = req.params
    const booking = getBookingByIdService(bid)
    if (!booking) {
        return res.status(404).json({ status: 'error', message: 'Reserva no encontrada' })
    }
    res.status(200).json({ status: 'success', payload: booking })
}

export const addServiceToBooking = (req, res) => {
    const { bid, sid } = req.params
    const updatedBooking = addServiceToBookingService(bid, sid)
    if (!updatedBooking) {
        return res.status(404).json({ status: 'error', message: 'Reserva o servicio no encontrado' })
    }
    res.status(200).json({ status: 'success', payload: updatedBooking })
}

export const updateBooking = (req, res) => {
    const { bid } = req.params
    const updatedData = req.body
    const updatedBooking = updateBookingService(bid, updatedData)
    if (!updatedBooking) {
        return res.status(404).json({ status: 'error', message: 'Reserva no encontrada' })
    }
    res.status(200).json({ status: 'success', payload: updatedBooking })
}

export const deleteBooking = (req, res) => {
    const { bid } = req.params
    const deletedBooking = deleteBookingService(bid)
    if (!deletedBooking) {
        return res.status(404).json({ status: 'error', message: 'Reserva no encontrada' })
    }
    res.status(200).json({ status: 'success', payload: deletedBooking })
}