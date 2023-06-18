import cold from "./assets/cold4.jpg"
import hotbg from "./assets/hotbg.jpg"
import overcast from "./assets/overcastCloud.jpg"
import './App.css';
import Description from "./components/Description";
import { useEffect, useState } from "react";
import { getWeatherData } from "./WeatherService";
import TimeDate from  "./components/DateTimeComponent"


function App() {
  
  const [city,setCity] = useState("Paris")
  const [weather,setweather] = useState(null); 
  const [units,setunits] = useState("metric");  
  const [bg,setbg] = useState(hotbg)


   useEffect(()=>{
    const fetchweatherdata = async()=>{
    const data= await getWeatherData(city,units)
    setweather(data);

    // dynamic bg
    const threshold =  units==='metric'? 20 : 60; 
    const check = 'Scattered Clouds'
    if(data.temp <= threshold) setbg(cold);
    else if(data.description === check ) setbg(overcast);
    else setbg(hotbg);

  };
  fetchweatherdata();
   },[units,city]);



   const handleUnitsClick = (e)=>{
      const button = e.currentTarget;
      const currentUnit = button.innerText.slice(1);
      
      const isCelsius = currentUnit==="C";
      button.innerText = isCelsius ? "°F": "°C";
      setunits(isCelsius ? "metric" : "imperial");
   }

   

   const enterKeyPressed = (e) =>{
     
    if(e.keyCode === 13){
      setCity(e.currentTarget.value);
        e.currentTarget.blur();
    }
   }
     


  return (
   
  <div className="app" style={{backgroundImage: `url(${bg})`}}>
    <div className="overlay">
      {
        weather && (
<div className="container">
        <div className="section section_inputs">
        <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City.." />
        <button onClick={(e) => handleUnitsClick(e)}>°F</button>
        </div>
      

      <div className="section section_temperature">
        <div className="icon">
          <h3>{`${weather.name}, ${weather.country}`}</h3>
          <img src={weather.iconUrl} alt="weatherIcon" />
          <h3>{weather.description}</h3>
        </div>

  

        <div className="temperature">
          <h1>{`${weather.temp.toFixed()} °${units === "metric" ? 'C' : 'F'} ` }</h1>
        </div>
      </div>

      <div className="timeDate">
          <TimeDate/>
        </div>


     
     <Description weather= {weather} units = {units}/>
      </div>

        )
      }
      
    </div>
    
  </div>
   
  );
}

export default App;
