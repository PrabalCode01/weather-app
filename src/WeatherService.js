const API_KEY = '65cedddfbbb06a0254ddd5494c130fc6';

const makeIcon = (iconId)=> `https://openweathermap.org/img/wn/${iconId}@2x.png`

const getWeatherData = async (city , units='metric') =>{

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data= await fetch(URL)
        .then((res)=> res.json())
        .then((data)=>data
    );

    
    const {weather , 
    main:{temp,feels_like,temp_max,temp_min,pressure,humidity},
     wind:{speed}, 
    sys:{country},
    name,     
} = data;

const {description,icon} = weather[0];

return{
    description,
    iconUrl : makeIcon(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    speed,
    country,
    name,
    humidity

};
};

export {getWeatherData};