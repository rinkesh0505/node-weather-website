const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherbit.io/v2.0/current?lat=' + latitude + '&lon=' + longitude + '&key=015ad799024a4a518c593d803c15b2d2'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, `It is currently ${body.data[0].temp} degrees out. There is a ${body.data[0].clouds}% chance of rain. It's longitude is ${body.data[0].lon} and latitude is ${body.data[0].lat}.`)
        }
    })
}


module.exports = forecast