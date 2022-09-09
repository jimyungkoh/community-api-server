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

export { TYPEORM, BCRYPT_SALT };
