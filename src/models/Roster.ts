import { Model } from 'objection';

class Roster extends Model {
    static tableName = 'rosters';

    id!: number;
    doctorId!: number;
    date!: string;
    shift!: 'morning' | 'afternoon' | 'night';

    static relationMappings = {
        doctor: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'Doctor',
            join: {
                from: 'rosters.doctorId',
                to: 'doctors.id',
            },
        },
    };
}

export default Roster;
