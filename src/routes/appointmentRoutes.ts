import express from 'express';
import AppointmentController from '../controllers/AppointmentController';

const router = express.Router();

router.post('/', AppointmentController.bookAppointment);
router.get('/available', AppointmentController.getAvailableTimeSlots);

export default router;
