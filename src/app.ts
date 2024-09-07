import express from 'express';
import dotenv from 'dotenv';
import doctorRoutes from './routes/doctorRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import rosterRoutes from './routes/rosterRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/rosters', rosterRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
