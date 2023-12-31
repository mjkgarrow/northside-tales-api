const { app, PORT, HOST } = require('./app')
const dotenv = require('dotenv')
const { dbConnector, dbDisconnector } = require('./database')

// Config environment variables
dotenv.config()
let URL = ""
switch (process.env.NODE_ENV) {
    case "prod":
        URL = process.env.PROD_URL
        break;
    case "dev":
        URL = process.env.DEV_URL
        break;
    default:
        URL = process.env.PROD_URL
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
    console.log('\nServer is shutting down. Database disconnected.');
});

// Connect database
dbConnector(URL)
    .then(() => {
        console.log(`
    Connected to database`)
    })
    .catch(error => {
        console.log(`
    Error connecting to db: ` + error)
    })

app.listen(PORT, () => {
    console.log(`
    Server started, listening on port ${PORT}`)
})