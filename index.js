const express = require("express")
const router = require("./route")
const connectDB = require("./config/db")
const app = express()

require('dotenv').config()
app.use(express.json())
connectDB()
const PORT = process.env.PORT || 6000
app.use(router)


app.listen(PORT, ()=>{
    console.log(`The Server is Running on http://localhost:${PORT}`)
})