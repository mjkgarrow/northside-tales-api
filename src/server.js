const { app, PORT, HOST } = require('./app')
const dotenv = require('dotenv')
const { dbConnector, dbDisconnector } = require('./database')

// Config environment variables
dotenv.config()
let URL = ""
switch (process.env.NODE_ENV) {
    // case "production":
    //     URL = process.env.PROD_URL
    //     break;
    // case "development":
    //     URL = process.env.DEV_URL
    //     break;
    case "dev":
        URL = "mongodb://localhost:27017/northside_tales_db"
        break;
    default:
        console.log("Missing db URL")
}

// Config for shutdown
const cleanup = () => {
    dbDisconnector()
    console.log(`\nServer is shutting down. Database disconnected.`)

    // Exit the process
    process.exit(0);
};

// Listen for the SIGINT signal (Ctrl+C)
process.on('SIGINT', cleanup);

// Listen for the SIGTERM signal (kill command or Heroku shutdown)
process.on('SIGTERM', cleanup);

// Handle server close event
app.on('close', () => {
    dbDisconnector()
    console.log('Server is shutting down. Database disconnected.');
});

// Connect database
dbConnector(URL)
    .then(() => { console.log("Connected to database") })
    .catch(error => { console.log("Error connecting to db: " + error) })

app.listen(PORT, HOST, () => {
    console.log(`Server started, listening at http://${HOST}:${PORT}`)
})