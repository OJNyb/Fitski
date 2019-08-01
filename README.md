Add this to backend/config/keys.js, replace x with your own keys.

const APP*PORT = 5000;
const NODE_ENV = "development";
const mongoURI = XXXXXXXXXXXXXXXXXX
const SESS_NAME = "sid";
const SESS_SECRET = "secret";
const SESS_LIFETIME = 1000 * 60 _ 60 _ 24 \_ 7;
const REDIS_HOST = XXXXXXXXXXXXXXXXXX
const REDIS_PORT = 18498;
const REDIS_PASSWORD = XXXXXXXXXXXXXXXXXX

module.exports = {
APP_PORT,
NODE_ENV,
mongoURI,
SESS_NAME,
SESS_SECRET,
SESS_LIFETIME,
REDIS_HOST,
REDIS_PORT,
REDIS_PASSWORD
};

Run npm install both in top folder and ./frontend
