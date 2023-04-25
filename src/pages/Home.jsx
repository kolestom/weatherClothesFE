import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../api/own";
import { $user, setUser } from "../states/user";
import useRXjs from "../hooks/useRXjs";
import jwtDecode from "jwt-decode";

const Home = () => {
  
  const user = useRXjs($user)
  const navigate = useNavigate()
  const [filteredCities, setFilteredCities] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [input, setInput] = useState('');
  
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
    console.log(city, country);
    const apiResponse = await client.post(`/api/weather`, {
      city,
      country,
    })
    console.log(apiResponse.data);
  }

  
  return (
    <>
      <h2>Home Page</h2>
      <input type="text" value={input} onChange={(e) => handleComplete(e.target.value)} />
      <div className="dropdown" style={{display: input.length > 2 ? "block": "none"}}>
        {filteredCities.length > 0 &&
          filteredCities.map((city, i) => 
            <p key={i} onClick={e => dropClick(e.target.innerText)}>
              {city}
            </p>)}
      </div>
      <button onClick={()=>navigate('admin')}>Admin</button>
    </>
  );
}
export default Home