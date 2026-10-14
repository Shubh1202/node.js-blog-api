const express = require("express");
const app = express();
const cors = require("cors")
const limiter = require("./middleware/rateLimiter")
const helmet = require("helmet")
const { databaseConnection } = require("./config/dbConfig")
const { urlNotFound, serverError } = require("./middleware/errorHandeling")
const routesIndex = require("./routes/index")

const API_VERSION = process?.env?.API_VERSION

// database connection
databaseConnection()
app.use(express.json())
app.use(cors())
app.use(limiter)
app.use(helmet())

app.use(`${API_VERSION}`, routesIndex)

// app.use(logger)
app.use(urlNotFound)
app.use(serverError)


module.exports = app;