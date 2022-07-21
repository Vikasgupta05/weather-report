import React from "react";
import "../Style/weather.css"
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react";
import { Box } from "@mui/system";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import Graph1 from "./graph_1";
import sunny from '../Images/sunny.png'




export const Weather = () => {

    const [search , setSearch] = useState()
    const [weather , setWeather] = useState()
    const [pressure ,  setPressure] = useState()
    const [humdity ,  setHumdity] = useState()


    useEffect(() => {
        data()
    },[])


    const data = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=38d793fd557896e87ffc86c502e4dac0&units=metric`).then(function(res) {
            console.log("data:", res.data)
            console.log( "log",res.data.coord.lon)
            console.log( "lat",res.data.coord.lat)
            setWeather(res.data.main.temp)
            setPressure(res.data.main.pressure)
            setHumdity(res.data.main.humidity)



            
        })
    }

    const get_lat_Log = (lat , lon) => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=38d793fd557896e87ffc86c502e4dac0&units=metric`).then(function(res) {

        })  
    }



    return(


        <div>
            <div className="search_bar_div">
                <LocationOnIcon/>
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="Search_bar_input"
                    onChange={(el) => {
                    setSearch(el.target.value)
                    }}    
                />
                <SearchIcon/>
            </div>

            <button
                onClick={data}
            >
                    Search
            </button>



            <div>
                {/* {
                    weather?.map((e, i) => {
                        // console.log(e.dt)
                        // const dateTimeStr = new Date(e.dt*1000).toLocaleString("en-US",{weekday:"long"}).slice(0,3);
                        return (
                        <div key={i} className="Weather_8days">
                            <div className='Weatherdetails'>
                            <p className="weekdays">{dateTimeStr}</p>
                            <span className="span maxtemp">{e.temp.max.toFixed()}&deg;</span>
                            <span className="span mintemp">{e.temp.min.toFixed()}&deg;</span>
                            </div>
                            <div className="image_div">
                            <img className="image" src={(e.weather[0].main == "Clear") ? sunny : (e.weather[0].main == "Rain") ? rainy : cloudy} />
                            <p className='Weather_status'>{e.weather[0].main}</p>
                            </div>
                        </div>
                        )
                    })
                } */}

            </div>


            <div className="dispaly_weather">
                <div className="temp_div">

                    <span>
                        <p >
                            Temprature :   {weather}°C
                        </p>
                    </span>

                    <span  >

                        
                         <img src={sunny} alt="" />

                    </span>

                </div>

                <div className="Graph1">

                    <Graph1/>
                </div>

                <hr />

                <div className="pres_humi">
                    <span>
                        <p>
                            Pressure :  <p1>  {pressure} </p1>
                        </p>
                    </span>

                    <span>
                        <p>
                        Humidity :   <p1>  {humdity}% </p1>
                        </p>
                    </span>
                </div>

        

            </div>
        </div>
    )
}



