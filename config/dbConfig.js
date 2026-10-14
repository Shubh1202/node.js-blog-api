const mongoose = require("mongoose")
const databaseConnection = (() => {
    try {
        const dbUrl = process.env.DB_URL
        mongoose.connect(dbUrl)
        console.log(`Database conection successfully done`)
    } catch (error) {
        console.log(`Database connection error ==>`, error)
    }
})

module.exports = {
    databaseConnection
}