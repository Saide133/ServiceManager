import { readFileSync, writeFileSync } from 'fs'
import { randomUUID } from 'crypto'

class BookingManager {
    constructor(serviceManager) {
        this.serviceManager = serviceManager
        const data = readFileSync('./src/data/bookings.json', 'utf-8')
        this.bookings = JSON.parse(data)
    }  

    createBooking(bookingData) {
       const { clientName, clientEmail, date, time, services = [] } = bookingData

        if (!clientName || !clientEmail || !date || !time) {
            return null
        }

        const newBooking = {
            id: randomUUID(),
            clientName,
            clientEmail,
            date,
            time,
            services,
            status: 'pending'
        }

        this.bookings.push(newBooking)
        this.saveBookings()
        return newBooking
    }

    saveBookings() {
        writeFileSync('./src/data/bookings.json', JSON.stringify(this.bookings, null, 2))
    }

    getBookingById(id) {
        const booking = this.bookings.find(b => b.id === id)

        if (!booking) {
            return null
        }
        return booking
    }

    addServiceToBooking(bid, sid) {
        const booking = this.getBookingById(bid)
        if (!booking) {
            return null
        }

        const service = this.serviceManager.getServiceById(sid)
        if (!service) {
            return null
        } 
        
        const existingEntry = booking.services.find(s => s.service === sid)
        if (existingEntry) {
            existingEntry.quantity += 1
        } else {
            booking.services.push({ service: sid, quantity: 1 })
        }

        this.saveBookings()
        return booking

    }
    
    updateBooking(bid, updatedData) {
        const index = this.bookings.findIndex(b => b.id === bid)
        if (index === -1) {
            return null
        }

        if (updatedData.id) {
            delete updatedData.id
        }

        this.bookings[index] = { ...this.bookings[index], ...updatedData }
        this.saveBookings()
        return this.bookings[index]
    }

    deleteBooking(bid) {
        const index = this.bookings.findIndex(b => b.id === bid)
        if (index === -1) {
            return null
        }

        const deletedBooking = this.bookings.splice(index, 1)[0]
        this.saveBookings()
        return deletedBooking
    }


}

export default BookingManager