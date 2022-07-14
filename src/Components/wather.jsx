import React from "react";
import "../Style/weather.css"
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react";
import { Box } from "@mui/system";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';





export const Weather = () => {

    const [search , setSearch] = useState()

    useEffect(() => {
        data()
    },[])


    const data = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=38d793fd557896e87ffc86c502e4dac0&units=metric`).then(function(res) {
            console.log(res.data)
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
        </div>
    )
}



