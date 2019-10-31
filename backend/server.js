const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const connectRedis = require("connect-redis");
const bodyParser = require("body-parser");

const user = require("./routes/api/user");
const woPlan = require("./routes/api/woPlan");
const history = require("./routes/api/history");
const exercise = require("./routes/api/exercise");

const createErrorObject = require("./utils/createErrorObject");

const {
  APP_PORT,
  NODE_ENV,
  mongoURI,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD
} = require("./config/keys");

(async () => {
  try {
    mongoose

      .connect(mongoURI, {
        useNewUrlParser: true,
        useFindAndModify: false
      })

      .then(() => console.log("MongoDB Connected"))
      .catch(err => console.log(err));

    const app = express();
    app.disable("x-powered-by");

    // Body parser middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    const RedisStore = connectRedis(session);

    const store = new RedisStore({
      host: REDIS_HOST,
      port: REDIS_PORT,
      pass: REDIS_PASSWORD
    });

    const sessionMiddleware = session({
      store,
      name: SESS_NAME,
      secret: SESS_SECRET,
      resave: false,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(SESS_LIFETIME),
        sameSite: true,
        secure: NODE_ENV === "production"
      }
    });
    app.use(sessionMiddleware);

    // Use Routes
    app.use("/api/user", user);
    app.use("/api/plan", woPlan);
    app.use("/api/history", history);
    app.use("/api/exercise", exercise);

    app.use(function(err, req, res, next) {
      console.log(err);
      console.error(err.stack);
      if (err.noRes) return;

      res.status(500).json(createErrorObject(["Something gnarly happened"]));
    });

    app.listen(APP_PORT, () => {
      console.log(`Listening on port ${APP_PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
})();
