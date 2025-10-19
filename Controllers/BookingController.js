import ErrorWithStatusCode from '../Exceptions/ErrorWithStatusCode.js'
import BookingService from '../Services/BookingService.js';

class BookingController {
	static async reserve(req, res) {	
		try {
			const { event_id, user_id } = req.body;
			if(!event_id || !user_id) {
				throw new ErrorWithStatusCode('event_id and user_id are required!', 400);
			}
			const result = await BookingService.reserve(event_id, user_id);
			res.status(201).json({
				message: "Booking created successfully",
				data: result
			});
		} catch (error) {
			res.status(error.statusCode || 500).json({
				message: "Failed to reserve you",
				error: error.message
		  	});
		}
	}
}

export default BookingController;