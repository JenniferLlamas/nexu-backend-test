
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./database')

const BrandsRouter = require("./routes/BrandsRouter");
const ModelsRouter = require("./routes/ModelsRouter");

app.use(express.json())
app.use(cors('*'))


//Test Route
app.get("/", (request, response) => {
  response.status(200).send(" - API NEXU WORKING -  ");
});

app.use(BrandsRouter)
app.use(ModelsRouter)


const PORT = process.env.PORT
const server = app.listen(PORT, () =>
  console.log('Server running on port: ', PORT)
)

module.exports = { app, server }
