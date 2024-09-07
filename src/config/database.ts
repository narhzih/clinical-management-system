import knex from 'knex';
import { Model } from 'objection';

const knexInstance = knex(require('../../knexfile').development);

Model.knex(knexInstance);

export default knexInstance;
