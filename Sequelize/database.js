import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
	'interview_task', // db_name
  	'postgres', // user
  	'root', // password
  	{
  	  host: 'localhost',
  	  port: 5432,
  	  dialect: 'postgres',
  	}
);

export default sequelize;