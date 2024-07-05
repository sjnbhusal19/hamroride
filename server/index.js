const express = require('express')
const cors = require('cors')
const dbConnect = require('./src/db/connection');
const userRoute = require ('./src/routes/user')

dbConnect()
const app = express()

app.use(cors())
require ('dotenv').config()
const port = process.env.PORT 

app.use(express.json()); // Middleware to parse JSON

app.use(userRoute)



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
