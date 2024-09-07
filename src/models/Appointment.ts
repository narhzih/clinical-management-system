import { Model } from 'objection';

class Appointment extends Model {
    static tableName = 'appointments';

    id!: number;
    userId!: number;
    doctorId!: number;
    date!: string;
    startTime!: string;
    endTime!: string;

    static relationMappings = {
        doctor: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'Doctor',
            join: {
                from: 'appointments.doctorId',
                to: 'doctors.id',
            },
        },
    };
}

export default Appointment;
