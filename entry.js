import express from 'express';
import { sequelize } from './Sequelize/index.js';
import { BookingRouter } from './Routers/BookingRouter.js'

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use('/api', BookingRouter);

async function startApp() {
	try {
		console.log('Connecting to DB...');
		await sequelize.authenticate();
		await sequelize.sync();
		console.log('DB connected!');
		app.listen(PORT, () => { console.log(`Server started on port: ${PORT}`) });
	} catch (error) {
		console.log(error);
	}
}

startApp();