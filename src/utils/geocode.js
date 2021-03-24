const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2t5cXV0ZSIsImEiOiJja2xzcW9xdnowMTI0Mm5vZHJmMjA5NnU1In0.0YlSSNY6Hf7oiNnrB053AA&limit=1'
    console.log('url:',url)
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            console.log('eeor', error)
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            console.log('response:',response)
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode