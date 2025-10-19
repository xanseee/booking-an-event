import { Router } from 'express';
import BookingController from '../Controllers/BookingController.js';
import { Event } from '../Sequelize/index.js';

const router = new Router();

router.post('/bookings/reserve', BookingController.reserve); // бронирование места	
// router.get('/bookings'); // получение всех ивентов
// router.get('/bookings/:event_id'); // получение конкретного
router.post('/event', async (req, res) => { // This endpoint only for testing -> create event
	try {
		const { name, total_seats } = req.body;
		const newEvent = await Event.create({ name, total_seats }).then(result => result.toJSON());
		res.status(201).json({
			message: "Created successfully",
			data: newEvent
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "undefined error",
			error
		});
	}
})

export { router as BookingRouter };