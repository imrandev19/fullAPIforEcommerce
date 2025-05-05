const express = require("express")
const router = express.Router()
let api = require("./api")
// http://localhost:5000/api/v1
router.use("/api/v1", api)
module.exports =router