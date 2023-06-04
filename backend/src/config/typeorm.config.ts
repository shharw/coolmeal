import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config({ path: '.env' });

export const typeOrmConfig: DataSourceOptions = {
  type: process.env.TYPEORM_CONNECTION as any,
  host: process.env.TYPEORM_HOST,
  port: +process.env.TYPEORM_PORT,
  username: 'shharw',
  password: 'aHZf63WsfM',
  database: 'coolmeal',
  logging: Boolean(process.env.TYPEORM_LOGGING),
  // entities: [__dirname + '/../entities/*.entity{.js,.ts}'],
  migrations: [__dirname + '/../migrations/*{.js,.ts}'],
  migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
};

export default new DataSource(typeOrmConfig);
