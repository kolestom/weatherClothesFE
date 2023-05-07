import axios from "axios";
import { useState, useEffect } from "react";
import { client } from "../api/own";
import { $user, setUser } from "../states/user";
import useRXjs from "../hooks/useRXjs";
import jwtDecode from "jwt-decode";
import styles from './Home.module.css'
import { WeatherCard } from "../comps/WeatherCard";
import { Input, Select, InputRightElement, InputGroup } from "@chakra-ui/react";
import SearchInput from "../comps/SearchInput";
import { getWeather } from "../util/getWeather";

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
    if (e.length > 2) {
      setFilteredCities(cityList.filter(city => city.toLowerCase().startsWith(e)))
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
                <Select value={selectedOption} placeholder='Select a favorite' onChange={(e)=> getWeather(e, setWeather, setSelectedOption, setInput)}>
                  {favCities.map((city, i) =>  <option value={`${city.city}, ${city.country}`} key={i}>{city.city}, {city.country}</option> )}
                </Select>
                ) : (
                <div className={styles.loader}></div>
                )}
            </div>
          }
          <SearchInput {...{input, handleInput, setInput, filteredCities, setWeather, setSelectedOption}}/>
        </div>
        {weather ?
        <WeatherCard {...{weather, favCities, setFavCities}}/>
        : <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_sHPrbL4o3f.json" background="transparent"  speed="2"  style={{width: "300px"}}  loop autoplay></lottie-player>}
      </div>
    </>
  );
}
export default Home