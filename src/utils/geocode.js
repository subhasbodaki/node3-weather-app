const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic3ViaGFzY2hhbmRyYWJvZGFraXlhdmFyIiwiYSI6ImNrbXJjOWRwZjAyZG0ycHBjeGtvaXV0ZDIifQ.m6IFg27hKIrb1JjHnqhUjg'

    request({url, json : true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to Location Service', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location, please provide a Valid Location', undefined)
        }
        else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}



module.exports = geocode