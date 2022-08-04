import React from "react";
import "../Style/weather.css"
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react";
import { Box } from "@mui/system";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import Graph1 from "./graph_1";
import Graph2 from "./graph_2";

import sun from '../Images/sun.png'
import cloud from "../Images/cloud.png"
import rain from "../Images/rain.png"





export const Weather = () => {

    const [alldata , allData] = useState([])
    const [search , setSearch] = useState()
    const [weather , setWeather] = useState()
    const [pressure ,  setPressure] = useState()
    const [humdity ,  setHumdity] = useState()
    const [sunrise ,  setSunrise] = useState()
    const [sunset ,  setSunset] = useState()
    const [weatherImage , setWeatherImage] = useState()

  const [list, setList] = useState([]);
  const [arraylist, setarraylist] = useState([]);


    console.log("ss" , alldata)


    useEffect(() => {
        data()
        getlocation()
    },[])


    var id;
    function debounc(){
        if(id){
            clearTimeout(id)
        }
        
        id=setTimeout(() => {
            data()
        },3000)
        
    }

    const Handelchange = (e) => {
        setSearch(e.target.value)
        debounc()
    }
    



    const data = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=38d793fd557896e87ffc86c502e4dac0&units=metric`).then(function(res) {
            console.log("data:", res.data)
            allData(res.data)
            setWeather(res.data.main.temp)
            setPressure(res.data.main.pressure)
            setHumdity(res.data.main.humidity)
            setSunrise(res.data.sys.sunrise)
            setSunset(res.data.sys.sunset)
            // .then(data => get_len_lon(res.data.coord.lon, data.coord.lat))

            
        })
    }

    const get_len_lon = (lon,lat) => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=38d793fd557896e87ffc86c502e4dac0&units=metric`).then(function(res) {
                display_weather(res.data)
        })  
    }
    
    const curent_status = (status) => {
        let lat=status.coords.latitude;
        let lon=status.coords.longitude;
        get_len_lon(lon, lat);
    }


    const display_weather = (data) => {
        setarraylist(data.daily)
        setList(data.current)
        
    }

    const getlocation = () => { 
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(curent_status);
        } else {
          console.log("not getting")
        }
    }


    // const checkImage = (e) => {

    //     if(e.weather[0].main == "Rain"){
    //         setWeatherImage(rain)
    //     }
    //     else if(e.weather[0].main == "Clear"){
    //         setWeatherImage(sun)
    //     }
    //     else{
    //         setWeatherImage(cloud)
    //     }
    // }

    return(

        <div>
            <div className="search_bar_div">
                <LocationOnIcon/>
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="Search_bar_input"

                        onChange={Handelchange}
                    />
                    <SearchIcon
                        onClick={data} 
                    />
                    


        </div>

        <div> 


            {/* {
                alldata.map((e) => (
                    // <p>{e.name}</p>
                    <p>vikas</p>
                ))
            } */}
                
                {/* {
                arraylist.map((e) => (

                 <p>{e.title}</p>

                }

                ))
                 */}

{/* 
            
                list.map((el) => {
                    if(el.title.includes(searchtext) ){
                        return  (
                            <li key={el.id}>
                                {el.title}
                            </li>            
                        )
                    }
            
                }) */}


        </div>

            <div className="weak_div">
                    {
                    arraylist?.map((e, i) => {
                        // console.log(e.dt)
                        const datesT = new Date(e.dt*1000).toLocaleString("en-US",{weekday:"long"}).slice(0,3);
                        return (
                        <div key={i} className="weak_days">
                            <div className='weather_detail_div'>
                            <p className="weekdays">{datesT}</p>
                            <span className="span">Max  {e.temp.max.toFixed()}</span> <br />
                            <span className="span">Min  {e.temp.min.toFixed()}</span>
                            </div>
                            <div className="image_div">
                            <img className="image_pick_div" src={rain } />

                            {/* <img className="image_pick_div" 

                                src={weatherImage}
                                onChange={checkImage(e)}
                             /> */}


                           
                            <p className='Weather_status'>{e.weather[0].main}</p>
                            </div>
                        </div>
                        )
                    })}
            </div>


            <div className="dispaly_weather">
                <div className="temp_div">

                    <span>
                        <p >
                            Temprature :   {weather}°C
                        </p>
                    </span>

                    <span  >

                        
                         <img src={sun} alt="" />

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

                <div className="sunrise_set">
                    <span>
                        <p className="sunrise"> <a>Sunrise</a> <br />{new Date(sunrise*1000).toLocaleString().slice(11, 15)}am</p> 
                    </span>

                    <span>
                        <p className="sunset"><a>Sunset</a> <br />{new Date(sunset*1000).toLocaleString().slice(11, 15)}pm</p>
                    </span>
                </div>


                <div className="graph_2">
                      <Graph2/>
                </div>

                <hr />

                <div className="map_div">
                    <iframe src={`https://maps.google.com/maps?q=${search}&t=&z=13&ie=UTF8&iwloc=&output=embed`}  className="Map" frameborder="0">
                    </iframe>
                </div>

            </div>
        </div>
    )
}



