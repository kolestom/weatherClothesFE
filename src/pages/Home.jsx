import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../api/own";
import { $user, setUser } from "../states/user";
import useRXjs from "../hooks/useRXjs";
import jwtDecode from "jwt-decode";
import styles from './Home.module.css'
import { WeatherCard } from "../comps/WeatherCard";
import { Button, Input } from "@chakra-ui/react";

const Home = () => {
  
  const user = useRXjs($user)
  const navigate = useNavigate()
  const [filteredCities, setFilteredCities] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState(null)
  
  useEffect(()=>{
    const init = async () =>{
      const result = await axios.get("https://countriesnow.space/api/v0.1/countries")
      const formatted = []
      await result.data.data.map(country => country.cities.map(city => formatted.push(`${city}, ${country.country}`)))
      setCityList(formatted)
      if (localStorage.getItem('token')) setUser(jwtDecode(localStorage.getItem('token'))) // verify kell a lejarathoz
    }
    init()
  },[])
  
  const handleComplete =(e) => {
    setInput(e.toLowerCase())
    if (e.length > 2) {
      setFilteredCities(cityList.filter(city => city.toLowerCase().startsWith(e)))
    }
  }
  
  const dropClick = async(e) =>{
    const [city, country] = e.split(', ')
    const apiResponse = await client.post(`/api/weather`, {
      city,
      country,
    })
    console.log(apiResponse.data);
    setWeather(apiResponse.data)
  }

  
  return (
    <>
      {/* <h2>Home Page</h2> */}
      <div className={styles.mainDiv}>
        <div className={styles.citySearch}>
          <Input className={styles.input} width={"70%"} placeholder='Search city' value={input} onChange={(e) => handleComplete(e.target.value)}/>
          <span className="material-symbols-outlined" onClick={()=>setInput('')}>delete</span>
          <div className={styles.dropdown} style={{display: input.length > 2 ? "block": "none"}}>
            {filteredCities.length > 0 &&
              filteredCities.map((city, i) => 
              <p key={i} onClick={e => dropClick(e.target.innerText)}>
                  {city}
                </p>)}
          </div>
        </div>
        {weather && <WeatherCard {...{weather}}/>}
      </div>
    </>
  );
}
export default Home