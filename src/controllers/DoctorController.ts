import { Request, Response } from 'express';
import Doctor from '../models/Doctor';

class DoctorController {
    async getAllDoctors(req: Request, res: Response) {
        try {
            const doctors = await Doctor.query();
            res.json(doctors);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve doctors' });
        }
    }

    async getDoctorById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const doctor = await Doctor.query().findById(id);
            if (doctor) {
                res.json(doctor);
            } else {
                res.status(404).json({ error: 'Doctor not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve doctor' });
        }
    }

    async createDoctor(req: Request, res: Response) {
        try {
            const doctor = await Doctor.query().insert(req.body);
            res.status(201).json(doctor);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create doctor' });
        }
    }

    async updateDoctor(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedDoctor = await Doctor.query().patchAndFetchById(id, req.body);
            if (updatedDoctor) {
                res.json(updatedDoctor);
            } else {
                res.status(404).json({ error: 'Doctor not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to update doctor' });
        }
    }

    async deleteDoctor(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedCount = await Doctor.query().deleteById(id);
            if (deletedCount > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Doctor not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete doctor' });
        }
    }
}

export default new DoctorController();
