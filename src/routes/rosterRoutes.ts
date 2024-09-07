import express from 'express';
import RosterController from '../controllers/RosterController';

const router = express.Router();

router.post('/', RosterController.createRoster);
router.get('/:date', RosterController.getRosterByDate);
router.put('/:id', RosterController.updateRoster);
router.delete('/:id', RosterController.deleteRoster);

export default router;
