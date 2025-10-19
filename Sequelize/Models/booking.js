import sequelize from '../database.js';
import { Model, DataTypes } from 'sequelize';

export default class Booking extends Model {} 

Booking.init( 
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    	event_id: { type: DataTypes.INTEGER, allowNull: false, references: { 
			model: 'events', key: 'id' 
		}},
    	user_id: { type: DataTypes.STRING(100), allowNull: false },
    	created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
	}, 
	{
		sequelize, 
		modelName: 'Booking',
    	tableName: 'bookings',
    	timestamps: false,
	}
);