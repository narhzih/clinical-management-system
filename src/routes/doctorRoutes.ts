import express from 'express';
import DoctorController from '../controllers/DoctorController';

const router = express.Router();

router.get('/', DoctorController.getAllDoctors);
router.get('/:id', DoctorController.getDoctorById);
router.post('/', DoctorController.createDoctor);
router.put('/:id', DoctorController.updateDoctor);
router.delete('/:id', DoctorController.deleteDoctor);

export default router;
