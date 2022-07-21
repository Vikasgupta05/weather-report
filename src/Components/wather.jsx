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

    useEffect(() => {
        data()
    },[])


    const data = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=38d793fd557896e87ffc86c502e4dac0&units=metric`).then(function(res) {
            console.log("data:", res.data)
            console.log( "log",res.data.coord.lon)
            console.log( "lat",res.data.coord.lat)
            setWeather(res.data.main.temp)
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

            </div>
        </div>
    )
}



