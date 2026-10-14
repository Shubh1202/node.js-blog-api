const dotenv = require("dotenv").config({ path: './.env.local' })?.parsed
const app = require("./app")
const API_HOST = dotenv?.API_HOST || `localhost`
const API_PORT = dotenv?.API_PORT || 3000
const API_VERSION = dotenv?.API_VERSION || 'api/v1'



const server = app.listen(API_PORT, (err) => {
    const apiUrl = `http://${API_HOST}:${API_PORT}`
    const apiVersionUrl = `${apiUrl}${API_VERSION}`
    console.log(`API Url: ${apiUrl}`);
    console.log(`API Version Url: ${apiVersionUrl}`);
})

process.on("uncaughtException", (error) => {
    console.log(`UNCAUGHT EXCEPTION! Shutting down `)
    console.log(`Error name: ${error.name}, Message: ${error.message}`)

    server.close(() => {
        onsole.log('Process terminated due to uncaught exception');
        process.exit(1)
    })

})

process.on("unhandledRejection", (reason, promise) => {
    console.log(`UNHANDELED REJECTION! Shutting down.`)
    console.log(`Unhandled Rejection at: ${JSON.stringify(promise)}, Reason: ${reason}`)

    server.close(() => {
        process.exit(1)
    })
})
