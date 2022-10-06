import * as dotenv from 'dotenv';

dotenv.config();

const env = process.env;

// Set BCRYPT SALT
const BCRYPT_SALT = env.BCRYT_SALT || 10;

// NODE Environment
const NODE_ENV: string = env.NODE_ENV || 'development';

// TYPEORM Configurations
const environment = {
  testing: {
    type: env.DB_TYPE,
    host: env.DB_TESTING_HOST,
    port: env.DB_TESTING_PORT,
    username: env.DB_TESTING_USERNAME,
    password: env.DB_TESTING_PASSWORD,
    database: env.DB_TESTING_NAME,
    charset: env.DB_TESTING_CHARSET,
  },
  development: {
    type: env.DB_TYPE,
    host: env.DB_DEVELOPMENT_HOST,
    port: env.DB_DEVELOPMENT_PORT,
    username: env.DB_DEVELOPMENT_USERNAME,
    password: env.DB_DEVELOPMENT_PASSWORD,
    database: env.DB_DEVELOPMENT_NAME,
    charset: env.DB_DEVELOPMENT_CHARSET,
  },
  production: {
    type: env.DB_TYPE,
    host: env.DB_PRODUCTION_HOST,
    port: env.DB_PRODUCTION_PORT,
    username: env.DB_PRODUCTION_USERNAME,
    password: env.DB_PRODUCTION_PASSWORD,
    database: env.DB_PRODUCTION_NAME,
    charset: env.DB_PRODUCTION_CHARSET,
  },
};

const TYPEORM = environment[NODE_ENV];

const TYPEORM_SEEDING_SEEDS = env.TYPEORM_SEEDING_SEEDS;
const TYPEORM_SEEDING_FACTORIES = env.TYPEORM_SEEDING_FACTORIES;

// Weather API
const key = env.WEATHER_API_KEY;
const city = 'Seoul';
const lang = 'ko';
const WEATHER_URL = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&lang=${lang}`;

export {
  TYPEORM,
  BCRYPT_SALT,
  TYPEORM_SEEDING_SEEDS,
  TYPEORM_SEEDING_FACTORIES,
  WEATHER_URL,
};
