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
const origin = process.env.ORIGIN || 'https://orca-app-muje4.ondigitalocean.app/'
const secret = process.env.SESSION_SECRET || 'secret'

const corsOptions = {
    origin: ['https://orca-app-muje4.ondigitalocean.app/', 'http://localhost:3000'],
    credentials: true
}
app.use(cors(corsOptions))

// add json parsers
app.use(bodyParser.json())
// from class. needed?
app.use(bodyParser.urlencoded({extended: false}))

// auth & session setup
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}))

// setup passport
app.use(passport.initialize())
app.use(passport.session())

const User = require('./models/user')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// import controllers
const accountController = require('./controllers/account')
app.use(accountController)
const venueController = require('./controllers/venue');
app.use(venueController)
const checkInController = require('./controllers/check-in');
app.use(checkInController)
const tagController = require('./controllers/tag');
app.use(tagController)

// setup debug mode
if (debug) {
    // log mongoose queries
    mongoose.set('debug', true);
    // log express requests
    app.use((req, res, next) => {
        console.log("express request: ", req.method, req.url)
        next()
    })
    // setup test controller
    const testController = require('./controllers/test')
    app.use(testController)

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

    // serve swagger ui
    const specs = swaggerJsdoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    // start agenda. this will probably be moved to a worker process
    const agenda = require('./jobs/agenda');
}

app.get('/', (req, res) => res.send('IIO API Running...'))

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
    console.log(`Allowing requests from ${corsOptions.origin}`)
    console.log(`App is running at http://localhost:${port}`)
})