import { Router } from 'express'
import {
    createBooking,
    getBookingById,
    addServiceToBooking,
    updateBooking,
    deleteBooking
} from '../controllers/bookings.controller.js'

const router = Router()

router.post('/', createBooking)
router.get('/:bid', getBookingById)
router.post('/:bid/services/:sid', addServiceToBooking)
router.put('/:bid', updateBooking)
router.delete('/:bid', deleteBooking)

export default router