const express = require("express")
const cors = require("cors")
const journalRoutes = require("./Routes/Journal.routes")
const myApp = express();
myApp.use(express.json())
myApp.use(cors())
myApp.use("/journal",journalRoutes);
module.exports = myApp;