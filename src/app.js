const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000


//Define paths for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve


app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Scott'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hoiland'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Hoiland',
        message: 'This is the message'
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send('You must provide an address')
    }

    //Get the geocode (it will return the proper information with the call back)
    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(lat, long, (error, forecastInfo) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastInfo,
                location, 
                address: req.query.address 
            })

        })

    })  
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Scott', 
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Scott', 
        error: 'Page not found'
    })

})




app.listen(port, () => {
    console.log('Server is running correctly on port ' + port)
})