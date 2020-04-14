const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define Path for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//app.set('view engine', 'hbs')

// Setup static directory to serve
app.use(express.static(publicDirPath))

// app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));

// Setup handler engine and view path 
app.set('view engine', '.hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath)

 app.get('', (req, res) => {
          res.render('index', {
         title : 'Weather App',
         name: 'Rinkesh Choudhary'
     })
 })

 app.get('/about', (req, res) => {
     res.render('about', {
         title : 'About tree',
         name : 'Rinkesh Choudhary'
     })
 })

 app.get('/help', (req, res) => {
     res.render('help', {
         title : 'Help',
         message : 'This is a help page',
         name : 'Rinkesh Choudhary'
     })
 })

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error : 'Send Address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        } 

        forecast ( latitude, longitude, (error, forecastData) => {
            if ( error ) {
                return res.send({error})
            }

            res.send({
                forecast : forecastData,
                location : location,
                address : req.query.address
            })
        })
    })
})

// app.com 
// app.com/help 
// app.com/about
// app.com/weather

app.get('/help/*', (req, res) => {
    res.render('error', {
        title : 'Not Found',
        message : 'Help article not found',
        name : 'Rinkesh Choudhary'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title : 'Error',
        message : 'Error 404 Not Found',
        name : 'Rinkesh Choudhary'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})