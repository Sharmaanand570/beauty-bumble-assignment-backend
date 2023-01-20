const express = require('express')
const router = express.Router()
const { imageToColor } = require('../controllers/imageController')

router.post('/imageToColor', imageToColor)

module.exports = router