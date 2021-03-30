const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define path for Express config
const publicPathDirectory = path.join(__dirname, '../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine & views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)


//Setup static directory to serve 
app.use(express.static(publicPathDirectory))


app.get('',(req, res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Subhas Bodaki'
        
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Subhas Bodaki'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title : 'Help page',
        message : 'Hii this is alexa, How can I help you',
        name : 'Subhas Bodaki'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    return res.send({
        Error : 'Please provide the location..'
    })

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ Error : error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ Error : error })
            }

            res.send({
                Location : location,
                data : forecastData
            })
        })

    })

})


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            Error : 'Please Provide the search team'
        })
    }

    console.log(req.query.search);
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Subhas Bodakiyavar',
        errorMessage : 'The Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title : '404',
        name : 'Subhas Bodakiyavar',
        errorMessage : 'Page Not Found'
    })
})

//app.com
//app.com/hep
//app.com/about
//app.com/weather


//Start the server
app.listen(3000,() => {
    console.log("Server is up and running.....");
})