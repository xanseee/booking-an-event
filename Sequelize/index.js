import sequelize from './database.js';
import Event from './Models/event.js';
import Booking from './Models/booking.js';

Event.hasMany(Booking, { foreignKey: 'event_id' });
Booking.belongsTo(Event, { foreignKey: 'event_id' });

export { sequelize, Event, Booking };