import React from "react";
import "../Style/weather.css"
import { useState ,useEffect, useRef } from "react";
import axios from "axios"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import {Graph1} from "./graph_1";
import Graph2 from "./graph_2";
import sun from '../Images/sun.png'
import cloud from "../Images/cloud.png"
import rain from "../Images/rain.png"
import { City } from "country-state-city";
import {useGeoLocation} from "./useGeoLocation";


export const Weather = () => {

    const [search , setSearch] = useState()
    const [alldata , allData] = useState([])
    const [lat , setLat] = useState()
    const [lon , setLon] = useState()
    const [hour , setHour] = useState([])
    const [weather , setWeather] = useState()
    const [pressure ,  setPressure] = useState()
    const [humdity ,  setHumdity] = useState()
    const [sunrise ,  setSunrise] = useState()
    const [sunset ,  setSunset] = useState()
    const [arraylist, setarraylist] = useState([]);
    const Allstate = City.getCitiesOfCountry("IN");
    const location = useGeoLocation();


    const Handelchange = (e) => {
        setSearch(e.target.value)
    }

    const getWeatherData = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coordinates.lat}&lon=${location.coordinates.lon}&appid=9102fcb602fc2c718391570e2dab5618&units=metric`
          );
          setSearch(response.data.city.name);
          setLat(location.coordinates.lat)
          setLon(location.coordinates.lon)
          console.log(response.data)
        } catch (error) {
          console.error(error);
        }
    };
    
    const data = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=38d793fd557896e87ffc86c502e4dac0&units=metric`).then(function(res) {
            // console.log("data:", res.data)
            allData(res.data)
            setLat(res.data.coord.lat)
            setLon(res.data.coord.lon)
            setWeather(res.data.main.temp)
            setPressure(res.data.main.pressure)
            setHumdity(res.data.main.humidity)
            setSunrise(res.data.sys.sunrise)
            setSunset(res.data.sys.sunset)
        })
        GetLocation()
    }

    const EnterKey = (e) => {
        if (e.key === "Enter") {
            data();
        }
    };

    const GetLocation = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=38d793fd557896e87ffc86c502e4dac0&units=metric`).then(function(res) {
                // console.log("checkddd" , res.data)
            setHour(res.data.hourly)
            setarraylist(res.data.daily)
        })  
    }

    useEffect(() => {
        if(!!lat && !!lon){
            GetLocation()
        }
    },[lat, lon])


    useEffect(() => {
        if(!!location){
            getWeatherData();
        }
    }, [location]);


    useEffect(() => {
        if(search){
            data()
        }
    },[search])

    return(

        <div>
            <div className="search_bar_div">
                <LocationOnIcon/>
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="Search_bar_input"
                    onKeyPress={  EnterKey}
                    onChange={Handelchange}
                    value={search}
                />

                <SearchIcon
                    onClick={data} 
                />
            </div>
        <div> 


            <div className="allstates">
                {
                    Allstate.map((el , i) => {
                        let name =   el.name.toLocaleLowerCase()
                        if(name.includes(search) ){
                            if(search !== name){
                                return  (
                                    <div key={i} >
                                    <h3 onClick={()=>setSearch(name)} >{ name}</h3> 
                                    </div>            
                                )
                            }
                        }
                    })
                }
            </div>

        </div>
            <div className="weak_div">
                    {
                    arraylist?.map((e, i) => {
                        const datesT = new Date(e.dt*1000).toLocaleString("en-US",{weekday:"long"}).slice(0,3);
                        return (
                        <div key={i} className="weak_days">
                            <div className='weather_detail_div'>
                            <p className="weekdays">{datesT}</p>
                            <span className="span">Max  {e.temp.max.toFixed()}°</span> <br />
                            <span className="span">Min  {e.temp.min.toFixed()}°</span>
                            </div>
                            <div className="image_div">
                            <img className="image_pick_div" src={(e.weather[0].main == "Rain") ? rain  : ((e.weather[0].main == "Clouds") ? cloud  : sun)} alt="" />
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
                    <div>{data && <Graph1 data={hour} />}</div>
                </div>

                <hr />

                <div className="pres_humi">
                    <span>
                        <p>
                         Pressure :  <span>  {pressure}hpa </span>
                        </p>
                    </span>

                    <span>
                        <p>
                         Humidity :   <span>  {humdity}% </span>
                        </p>
                    </span>
                </div>

                <div className="sunrise_set">
                    <span>
                        <p className="sunset"><a>Sunrise</a> <br />{new Date(sunset*1000).toLocaleString().slice(11,14)}am</p>
                    </span>

                    <span>
                        <p className="sunset"><a>Sunset</a> <br />{new Date(sunrise*1000).toLocaleString().slice(11,14)}pm</p>
                    </span>
                </div>

                <div className="graph_2">
                      <Graph2/>
                </div>

                <hr />

                <div className="map_div">
                    <iframe  src={`https://maps.google.com/maps?q=${search}&t=&z=13&ie=UTF8&iwloc=&output=embed`} className="Map" >
                    </iframe>
                </div>

            </div>
        </div>
    )
}



