import { Request, Response } from 'express';
import Appointment from '../models/Appointment';
import Doctor from '../models/Doctor';
import Roster from '../models/Roster';
import EmailService from '../services/EmailService';
import SMSService from '../services/SMSService';
import PDFService from '../services/PDFService';

class AppointmentController {
    async bookAppointment(req: Request, res: Response) {
        try {
            const { userId, doctorId, date, startTime, endTime } = req.body;

            // Check if the doctor is available (scheduled and not blocked)
            const isAvailable = await this.checkAvailability(doctorId, date, startTime, endTime);
            if (!isAvailable) {
                return res.status(400).json({ error: 'Time slot not available' });
            }

            // Create appointment
            const appointment = await Appointment.query().insert({
                userId,
                doctorId,
                date,
                startTime,
                endTime,
            });

            // Send notifications
            const doctor = await Doctor.query().findById(doctorId);
            if (!doctor) {
                return res.status(400).json({ error: 'doctor not found' });
            }
            await EmailService.sendAppointmentNotification(doctor.email, appointment);
            await SMSService.sendAppointmentNotification(doctor.phoneNumber, appointment);

            // Generate and send PDF
            const pdf = await PDFService.generateAppointmentPDF(appointment);
            await EmailService.sendAppointmentPDF(doctor.email, pdf);
            // TODO: Send PDF to user's email as well

            res.status(201).json(appointment);
        } catch (error) {
            res.status(500).json({ error: 'Failed to book appointment' });
        }
    }

    async getAvailableTimeSlots(req: Request, res: Response) {
        try {
            const { date } = req.query;
            const availableSlots = await this.findAvailableTimeSlots(date as string);
            res.json(availableSlots);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve available time slots' });
        }
    }

    private async checkAvailability(doctorId: number, date: string, startTime: string, endTime: string): Promise<boolean> {
        // Check if doctor is scheduled for the given date
        const roster = await Roster.query().findOne({ doctorId, date });
        if (!roster) {
            return false;
        }

        // Check if there are any overlapping appointments
        const overlappingAppointments = await Appointment.query()
            .where('doctorId', doctorId)
            .where('date', date)
            .where(function () {
                this.where('startTime', '<', endTime).andWhere('endTime', '>', startTime);
            });

        return overlappingAppointments.length === 0;
    }

    private async findAvailableTimeSlots(date: string) {
        // Get all doctors scheduled for the given date
        const scheduledDoctors = await Roster.query().where('date', date).withGraphFetched('doctor');

        const availableSlots = [];

        for (const roster of scheduledDoctors) {
            const doctorId = roster.doctorId;
            const shift = roster.shift;

            // Define time slots based on shift
            const timeSlots = this.getTimeSlotsForShift(shift);

            for (const slot of timeSlots) {
                const isAvailable = await this.checkAvailability(doctorId, date, slot.start, slot.end);
                if (isAvailable) {
                    availableSlots.push({
                        doctorId,
                        date,
                        startTime: slot.start,
                        endTime: slot.end,
                    });
                }
            }
        }

        return availableSlots;
    }

    private getTimeSlotsForShift(shift: string) {
        // Define time slots for each shift (adjust as needed)
        const slots = {
            morning: [
                { start: '08:00', end: '10:00' },
                { start: '10:00', end: '12:00' },
            ],
            afternoon: [
                { start: '13:00', end: '15:00' },
                { start: '15:00', end: '17:00' },
            ],
            night: [
                { start: '19:00', end: '21:00' },
                { start: '21:00', end: '23:00' },
            ],
        };

        return slots[shift as keyof typeof slots] || [];
    }
}

export default new AppointmentController();
