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
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(()=>{
    const init = async () =>{
      const result = await axios.get("https://countriesnow.space/api/v0.1/countries")
      const formatted = []
      await result.data.data.map(country => country.cities.map(city => formatted.push(`${city}, ${country.country}`)))
      setCityList(formatted)
      if (localStorage.getItem('token')) {
        setUser(jwtDecode(localStorage.getItem('token')))
      }
    }
    init()
  },[])

  useEffect(()=>{
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
    // setInput(e)
    if (e.length > 2) {
      setFilteredCities(cityList.filter(city => city.toLowerCase().startsWith(e)))
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
      setSelectedOption('');
      setInput('')
    }
  }

  console.log(weather);

  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.citySearch}>
          {user && 
            <div className={styles.favList}>
              {favCities ? (
                <Select value={selectedOption} placeholder='Select a favorite' onChange={getWeather}>
                  {favCities.map((city, i) =>  <option value={`${city.city}, ${city.country}`} key={i}>{city.city}, {city.country}</option> )}
                </Select>
                ) : (
                <div className={styles.loader}></div>
                )}
            </div>
          }
          <div className={styles.input}>
            <Input width={"80%"} placeholder='Search city' value={input} onChange={(e) => handleInput(e.target.value)}/>
            <span className="material-icons-outlined" onClick={()=>setInput('')}>delete</span>
          </div>
          <div className={styles.dropdown} style={{display: input.length > 2 ? "block": "none"}}>
            {filteredCities.length &&
              filteredCities.map((city, i) => 
                <option key={i} value={city} onClick={getWeather}>
                  {city}
                </option>)}
          </div>
        </div>
        {weather && <WeatherCard {...{weather, favCities, setFavCities}}/>}
      </div>
      
      {/* <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_sabv8ipv.json" mode="bounce" background="transparent"  speed="1"  style={{width: "30px"}}  loop controls autoplay></lottie-player> */}
    </>
  );
}
export default Home