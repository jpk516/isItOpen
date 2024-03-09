const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const cors = require('cors');
const passport = require('passport')
const bodyParser = require("body-parser")
const LocalStrategy = require('passport-local').Strategy

const port = process.env.port || 8000
const mongoUrl = process.env.MONGO_URI
const debug = process.env.DEBUG_MODE === 'true' || false;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions))

if (debug) {
    mongoose.set('debug', true);
    app.use((req, res, next) => {
        console.log("express request: ", req.method, req.url)
        next()
    })
}

// add json parsers
app.use(bodyParser.json())
// from class. needed?
app.use(bodyParser.urlencoded({extended: false}))

// auth setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

const User = require('./models/user')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// setup swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerSchemas = require('./models/swagger-schemas');
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Is It Open API',
        version: '1.0.0',
      },
      components: {
        schemas: swaggerSchemas
      },
    },
    apis: ['./controllers/*.js'], // files containing annotations as above
};
console.log(options)
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// import controllers
const accountController = require('./controllers/account')
app.use(accountController)
const venueController = require('./controllers/venue');
app.use(venueController)
const checkInController = require('./controllers/check-in');
app.use(checkInController)
const tagController = require('./controllers/tags');
app.use(tagController)

app.get('/', (req, res) => res.send('API Running...'))

async function connect() {
    try {
        mongoose.connect(mongoUrl)
            .then(() => console.log('MongoDB Connected'))
            .catch(err => console.log(err));
    } catch (error) {
        console.error(error)
    }
}

app.listen(port, () => {
    connect()
    console.log(`App is running at http://localhost:${port}`)
})