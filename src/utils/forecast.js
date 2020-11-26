const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=6a93a50c2414e129f596e0e8a6ebdeb6&query=' + lat +',' + long; 

    request({ url, json: true}, (error, {body}) => {



    //This will find low level errors or LAN errors.  This is a scenario where a response object doesn't exist but an error object does.  If the response is successful then the error object won't exist and this if statement won't succed. 
    if(error){
        callback('Your lan might not be working')
    } 
    //Checking to see if there is an error property on the response body. 
    else if (body.error) {
        callback('unable to find location')
    } 
    else {
        callback(undefined, 'It is currently ' + body.current.temperature + ' degrees out in ' + body.location.name + body.location.region + '.  If feels like ' + body.current.feelslike + ' degrees out.')
    }
})


}

module.exports = forecast