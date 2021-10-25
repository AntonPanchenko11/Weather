const express = require('express')
const bodyParser = require('body-parser')
const weatherRequest = require('./requests/weather.request')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req,res) => {
    res.render('index', {name: "Погода", error: null})
})

app.post('/', async (req,res) =>{
    const {city} = req.body

    const {name, t, wi, hum, error} = await weatherRequest(city)
    res.render('index', {name, t, wi, hum, error})
})

app.listen(3000, () => { 
    console.log('Server started on port 3000')
})