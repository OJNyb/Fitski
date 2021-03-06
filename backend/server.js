const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const connectRedis = require("connect-redis");
const bodyParser = require("body-parser");
const path = require("path");

const user = require("./routes/api/user");
const image = require("./routes/api/image");
const stripe = require("./routes/api/stripe");
const woPlan = require("./routes/api/woPlan");
const explore = require("./routes/api/explore");
const history = require("./routes/api/history");
const exercise = require("./routes/api/exercise");
const feedback = require("./routes/api/feedback");

const createErrorObject = require("./utils/createErrorObject");

const {
  PORT,
  APP_PORT,
  NODE_ENV,
  mongoURI,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD
} = process.env;

(async () => {
  try {
    mongoose
      .connect(mongoURI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
      })

      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch(err => console.log(err));

    const app = express();
    app.disable("x-powered-by");

    // Body parser middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(
      bodyParser.json({
        verify: function(req, _, buf) {
          var url = req.originalUrl;
          if (url.startsWith("/api/stripe/webhook")) {
            req.rawBody = buf.toString();
          }
        }
      })
    );

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
      proxy: true,
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
    app.use("/api/image", image);
    app.use("/api/stripe", stripe);
    app.use("/api/explore", explore);
    app.use("/api/history", history);
    app.use("/api/exercise", exercise);
    app.use("/api/feedback", feedback);
    app.use(
      "/.well-known",
      express.static(path.join(__dirname, "./.well-known"))
    );

    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
      app.get("*", (req, res) => {
        res.sendFile(
          path.join(__dirname, "..", "frontend", "build", "index.html")
        );
      });
    }

    app.use(function(err, req, res, next) {
      console.log(err);
      console.error(err.stack);
      if (err.isCustom) {
        res.status(400).json(err);
      }
      if (err.noRes) return;

      res.status(500).json(createErrorObject(["Something gnarly happened"]));
    });

    app.listen(PORT || APP_PORT, () => {
      console.log(`Listening on port ${PORT || APP_PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
})();
