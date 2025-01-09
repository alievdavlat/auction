import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  database: 'auction',
  username: 'postgres',
  password: 'aliev2002',
  host: 'localhost',
  port: 5432, 
  dialect: 'postgres', 
  logging:false
});






