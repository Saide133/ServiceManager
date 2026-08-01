import { readFileSync, writeFileSync } from 'fs'

class BookingDAO {
    constructor(){
        const data = readFileSync('./src/data/bookings.json', 'utf-8')
        this.bookings = JSON.parse(data)    
    }

    save(){
        writeFileSync('./src/data/bookings.json', JSON.stringify(this.bookings, null, 2))
    }

    getAll(){
        return this.bookings
    }

    getById(id){
        return this.bookings.find(booking => booking.id === id) || null
    }

    create(booking){
        this.bookings.push(booking)
        this.save()
        return booking
    }

    update(id, data){
        const index = this.bookings.findIndex(booking => booking.id === id)
        
        if (index === -1) {
            return null;
        }

        this.bookings[index] = { ...this.bookings[index], ...data }
        this.save()
        return this.bookings[index]
    }

    delete(id){
        const index = this.bookings.findIndex(booking => booking.id === id)

        if (index === -1) {
            return null
        }
        const deletedBooking = this.bookings.splice(index, 1)[0]
        this.save()
        return deletedBooking
    }     

}

export default BookingDAO