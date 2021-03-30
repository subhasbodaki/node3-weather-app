const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=a706facad3dd85c1bf46706d4485d5fa&query='+ latitude + ',' + longitude

    request({url, json : true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to Weather Service', undefined)
        }
        else if(body.error){
            callback('Unable to find location, please provide a Valid Location', undefined)
        }
        else{
             
            callback(undefined, 'It is currently ' + body.current.temperature + ' degrees out. And it feels like ' + body.current.feelslike + ' Degrees out' + 'And humidity is ' + body.current.humidity  )

        }
    })
}


module.exports = forecast