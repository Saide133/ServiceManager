import { randomUUID } from 'crypto'

class BookingRepository {
    constructor(dao) {
        this.dao = dao
    }

    getAll() {
        return this.dao.getAll()
    }

    getById(id) {
        return this.dao.getById(id)
    }

    create(bookingData) {
        const newBooking = {
            ...bookingData,
            services: bookingData.services || [],
            id: randomUUID(),
            status: 'pending'
        }
        return this.dao.create(newBooking)
    }

    update(id, data) {
        return this.dao.update(id, data)
    }

    delete(id) {
        return this.dao.delete(id)
    }
}

export default BookingRepository