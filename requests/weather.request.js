const rp = require('request-promise')

module.exports = async function(city = '') {
    if (!city){
        throw new Error('Имя города не может быть пустым')
    }

    const KEY = '402045ef86e2faf34b6adb6ede0beed3'
    const uri = 'http://api.openweathermap.org/data/2.5/weather'

    const options = {
        uri,
        qs: {
            appid: KEY,
            q: city,
            units:'standart',
            lang: 'ru'
        },
        json: true
    }
    try{
        const data = await rp(options);
        const nameTown = data.name;
        const celsius = data.main.temp - 273
        const wind = data.wind.speed;
        const humidity = data.main.humidity;
        console.log(data)
        
        return{
           /*  weather:`${data.name}: 
            Температура: ${celsius.toFixed(0)}, 
            Скорость ветра: ${wind} `, */
            name: nameTown,
            t: celsius.toFixed(0),
            wi: wind,
            hum: humidity,
            error: null,
        }
    }
    catch (error){
        return{
            weather: null,
            error: error.error.message
        }  
    }
}

