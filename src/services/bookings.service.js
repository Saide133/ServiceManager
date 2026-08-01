import BookingDAO from '../dao/bookings.dao.js'
import BookingRepository from '../repositories/bookings.repository.js'
import { getServiceById } from '../services/services.service.js'

const dao = new BookingDAO()
const repository = new BookingRepository(dao)

export const createBooking = (bookingData) => {
    const { clientName, clientEmail, date, time } = bookingData

    if (!clientName || !clientEmail || !date || !time) {
        return null
    }

    return repository.create(bookingData)
}

export const getBookingById = (id) => {
    return repository.getById(id)
}

export const addServiceToBooking = (bid, sid) => {
    const booking = repository.getById(bid)
    if (!booking) {
        return null
    }

    const service = getServiceById(sid)
    if (!service) {
        return null
    }

    const services = [...booking.services]
    const existingEntry = services.find(s => s.service === sid)

    if (existingEntry) {
        existingEntry.quantity += 1
    } else {
        services.push({ service: sid, quantity: 1 })
    }
    
    return repository.update(bid, { services })    
}

export const updateBooking = (bid, data) => {
    if (data.id) {
        delete data.id
    }
    return repository.update(bid, data)
}

export const deleteBooking = (bid) => {
    return repository.delete(bid)
}