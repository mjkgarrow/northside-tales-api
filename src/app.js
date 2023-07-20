const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const cors = require('cors')

// Routes imports
const MarkerRouter = require('./controllers/markerController')


// Express app instance
const app = express()

// Config environment variables
dotenv.config()
const HOST = process.env.HOST || 'localhost'
const DEPLOYED_SITE = process.env.DEPLOYED_SITE || 'localhost'
const PORT = process.env.PORT || 3000
const CLIENT_PORT = process.env.CLIENT_PORT || 5173 // default Vite dev port

// Config helmet for headers security
app.use(helmet())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"]
    }
}))

// Config CORS to prevent external access to API
app.use(cors({
    origin: ["http://localhost:" + PORT, "http://localhost:" + CLIENT_PORT, DEPLOYED_SITE],
    optionsSuccessStatus: 200
}))


// Config request data formatting.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Routes
app.use(MarkerRouter)

app.get('/dbhealth', (req, res) => {    // Gets database health information
    res.json({
        readyState: mongoose.connection.readyState,
        dbName: mongoose.connection.name,
        dbModels: mongoose.connection.modelNames(),
        dbHost: mongoose.connection.host
    })
})

app.get('/', (req, res) => {            // Home route for info about the API
    res.json({
        message: "Welcome to StrataSphere, a building management API for tracking all Owners Corporation needs! For detailed documentation visit https://github.com/Manage-My-Block/StrataSphere-Docs"
    })
})

app.get('*', (request, response) => {   // Catch unknown routes
    response.status(404).json({
        message: "No route with that path found!",
        attemptedPath: request.path
    })
})


// Exports
module.exports = {
    app,
    HOST,
    PORT
}

