import axios from "axios";
import { useState, useEffect } from "react";
import { client } from "../api/own";
import { $user, setUser } from "../states/user";
import useRXjs from "../hooks/useRXjs";
import jwtDecode from "jwt-decode";
import styles from './Home.module.css'
import { WeatherCard } from "../comps/WeatherCard";
import { Button, Input, Select } from "@chakra-ui/react";

const Home = () => {
  
  const user = useRXjs($user)
  const [filteredCities, setFilteredCities] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState(null)
  const [favCities, setFavCities] = useState([]);

  useEffect(()=>{
    const init = async () =>{
      const result = await axios.get("https://countriesnow.space/api/v0.1/countries")
      const formatted = []
      await result.data.data.map(country => country.cities.map(city => formatted.push({city: city, country: country.country})))
      setCityList(formatted)
      if (localStorage.getItem('token')) {
        setUser(jwtDecode(localStorage.getItem('token')))
      }
    }
    init()
  },[])

  useEffect(()=>{
    // if(!user) setFavCities([])
    const getFavs = async () =>{
      if (user) {
        const response = await client.get('/api/favCity', {
          headers: {
            Authorization: `Bearer: ${localStorage.getItem('token')}`
          }
        })
        setFavCities(response.data)
      }
    }
    getFavs()
  },[user])
  
  const handleInput =(e) => {
    setInput(e.toLowerCase())
    if (e.length > 2) {
      setFilteredCities(cityList.filter(city => city.city.toLowerCase().startsWith(e)))
    }
  }
  
  const getWeather = async(e) =>{
    if (e.target.value) {
      const [city, country] = e.target.value.split(', ')
      const apiResponse = await client.post(`/api/weather`, {
        city,
        country,
      })
      setWeather(apiResponse.data)
    }
  }

  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.citySearch}>
          {user && 
            <div className="favList">
              {favCities ? (
                <Select placeholder='Select a favorite' onChange={getWeather}>
                  {favCities.map((city, i) =>  <option value={`${city.city}, ${city.country}`} key={i}>{city.city}, {city.country}</option> )}
                </Select>
                ) : (
                <div className={styles.loader}></div>
                )}
            </div>
          }
          <Input className={styles.input} width={"70%"} placeholder='Search city' value={input} onChange={(e) => handleInput(e.target.value)}/>
          <span className="material-symbols-outlined" onClick={()=>setInput('')}>delete</span>
          <div className={styles.dropdown} style={{display: input.length > 2 ? "block": "none"}}>
            {filteredCities.length &&
              filteredCities.map((city, i) => 
                <option key={i} value={`${city.city}, ${city.country}`} onClick={getWeather}>
                  {city.city}, {city.country}
                </option>)}
          </div>
        </div>
        {weather && <WeatherCard {...{weather, favCities, setFavCities}}/>}
      </div>
    </>
  );
}
export default Home