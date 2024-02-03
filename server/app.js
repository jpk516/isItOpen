const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express()

const port = process.env.port || 8000

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions))

// add json parsers
app.use(bodyParser.json())
// from class. needed?
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => res.send('API Running...'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})