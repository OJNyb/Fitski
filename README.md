## About

A web application for creating workout plans & following them or just tracking your workouts on the fly.

My first big project... Quite messy code base and not always the best practices.

Created with the MERN stack

Made for fun :)

[Live version](https://chadify.herokuapp.com/).

## If you want to run this locally

### Create an .env file in the backend directorya and fill it with

```
AVATAR_FIELD=avatar
AVATAR_BASE_URL=/uploads/avatars
AVATAR_STORAGE=uploads/avatars
APP_PORT=5000
NODE_ENV=development
mongoURI=<YOUR MONGODB URI>
SESS_NAME=sid
SESS_SECRET=secret
SESS_LIFETIME=2629800000
REDIS_HOST=<YOUR REDIS HOST>
REDIS_PORT=<YOUR REDIS PORT>
REDIS_PASSWORD=<YOUR REDIS PASSWORD>
```

Add these if you want stripe/mailgun functionality

```
STRIPE_API_KEY=<YOUR STRIPE API KEY>
STRIPE_ENDPOINT_SECRET=<YOUR STRIPE WEBHOOK ENDPOINT SECRET>

MAILGUN_EMAIL=<YOUR MAILGUN PASSWORD>
MAILGUN_PASSWORD=<YOUR MAILGUN PASSWORD>
```

### Install dependencies

In top directory

```bash
$ npm run init
```

### Run

In top directory

```bash
$ npm run dev
```
