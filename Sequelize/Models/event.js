import sequelize from '../database.js';
import { Model, DataTypes } from 'sequelize';

export default class Event extends Model {}

Event.init(
  	{
  	  	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  	  	name: { type: DataTypes.STRING(255), allowNull: false },
  	  	total_seats: { type: DataTypes.INTEGER, allowNull: false }
  	},
  	{
  	  	sequelize,
  	  	modelName: 'Event',
  	  	tableName: 'events',
  	  	timestamps: false,
  	}
);
