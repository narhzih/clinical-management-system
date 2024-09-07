import { Request, Response } from 'express';
import Roster from '../models/Roster';

class RosterController {
    async createRoster(req: Request, res: Response) {
        try {
            const roster = await Roster.query().insert(req.body);
            res.status(201).json(roster);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create roster' });
        }
    }

    async getRosterByDate(req: Request, res: Response) {
        try {
            const { date } = req.params;
            const roster = await Roster.query().where('date', date).withGraphFetched('doctor');
            res.json(roster);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve roster' });
        }
    }

    async updateRoster(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedRoster = await Roster.query().patchAndFetchById(id, req.body);
            if (updatedRoster) {
                res.json(updatedRoster);
            } else {
                res.status(404).json({ error: 'Roster not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to update roster' });
        }
    }

    async deleteRoster(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedCount = await Roster.query().deleteById(id);
            if (deletedCount > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Roster not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete roster' });
        }
    }
}

export default new RosterController();
