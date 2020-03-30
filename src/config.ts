require('dotenv').config()

const {
  PORT = 3000,
  DB_URL = 'mongodb://localhost:27017/nestDB',
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
} = process.env;

const config = {
  PORT,
  DB_URL,
  AWSconfig: {
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY
  }
}

export default config;