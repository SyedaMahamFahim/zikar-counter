const express =require('express')
const app=express()

const cors = require('cors')  //use this


const errorMiddleware=require('./middleware/errors')


// App Methods
app.use(cors()) 
app.use(express.json())
app.use(express.urlencoded( {extended: true} ))



// Import all routes
const counterRoutes=require("./routes/counterRoutes")

// Routes
app.use("/api/v1/counter",counterRoutes)


// Middleware for error
app.use(errorMiddleware)

module.exports = app;


