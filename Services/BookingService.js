import { Event, Booking, sequelize } from '../Sequelize/index.js';
import ErrorWithStatusCode from '../Exceptions/ErrorWithStatusCode.js';

class BookingService {
	static async reserve (event_id, user_id) {
		const transaction = await sequelize.transaction();
		try {
			const event = await Event.findByPk(event_id, {
				lock: transaction.LOCK.UPDATE,
				transaction: transaction
			}).then(res => res.toJSON());
			if(!event) {
				await transaction.rollback();
				throw new ErrorWithStatusCode('Event not found!', 404);
			}

			const booking = await Booking.findOne({
				where: { event_id, user_id },
				transaction
			});
			if(booking) {
				await transaction.rollback();
				throw new ErrorWithStatusCode('User has already booked', 409);
			}

			if(event.total_seats > 0) {
				await Event.update({ total_seats: event.total_seats - 1 }, {
					where: { id: event_id },
					transaction
				});
				
				const newBooking = await Booking.create({ event_id, user_id, created_at: new Date() }, {
					transaction
				}).then(res => res.toJSON());

				await transaction.commit();
				return {
					booking: newBooking,
					available_seats: event.total_seats - 1
				}
			}
			throw new ErrorWithStatusCode('No available seats for this event', 400);
		} catch(error) {
			if(transaction && !transaction.finished) {
				await transaction.rollback();
			}
			throw error;
		}
	}
}

export default BookingService;