const getImageColors = require('get-image-colors')

const isValidImage = function (value) {
    let imgType = value.split('/')
    const regEx = /^(gif|jpeg|jpg|png)$/
    const result = regEx.test(imgType[1])
    return result
}

const imageToColor = async function (req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*')
        const image = req.files
        if (image.length == 0) {
            return res.status(400).send({ status: false, message: 'Upload Image' })
        }
        else if (image.length > 1) {
            return res.status(400).send({ status: false, message: 'Select only one image file' })
        }
        else if (!isValidImage(image[0].mimetype)) {
            return res.status(400).send({ status: false, message: 'Upload only JPG or JPEG or PNG or GIF or SVG format image' })
        }
        else {
            const options = {
                count: 256,
                type: image[0].mimetype
            }
            const imageColors = await getImageColors(image[0].buffer, options)
            const uniqueImageColors = uniqueColors(imageColors)
            return res.status(201).send({ status: true, colors: uniqueImageColors })
        }
    }
    catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

function uniqueColors(arr) {
    let map = new Map()
    let uniqueColors = []
    arr.map((e) => {
        if (!map.has(`${e._rgb[0]},${e._rgb[1]},${e._rgb[2]},${e._rgb[3]}`)) {
            map.set(`${e._rgb[0]},${e._rgb[1]},${e._rgb[2]},${e._rgb[3]}`, true)
            uniqueColors.push(`rgb(${e._rgb[0]},${e._rgb[1]},${e._rgb[2]},${e._rgb[3]})`)
        }
    })
    return uniqueColors
}

module.exports = { imageToColor }