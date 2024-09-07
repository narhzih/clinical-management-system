import { Model } from 'objection';

class Doctor extends Model {
    static tableName = 'doctors';

    id!: number;
    name!: string;
    email!: string;
    phoneNumber!: string;

    static relationMappings = {
        appointments: {
            relation: Model.HasManyRelation,
            modelClass: 'Appointment',
            join: {
                from: 'doctors.id',
                to: 'appointments.doctorId',
            },
        },
        rosters: {
            relation: Model.HasManyRelation,
            modelClass: 'Roster',
            join: {
                from: 'doctors.id',
                to: 'rosters.doctorId',
            },
        },
    };
}

export default Doctor;
