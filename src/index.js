const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const app = express()
const route = require('./routes/routes')

app.use(bodyParser.json())
app.use(multer().any())

app.use('/', route)

app.listen(3001, ()=>console.log("Beauty Bumble Assignment app is runing on port",3001))