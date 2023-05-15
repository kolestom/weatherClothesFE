import { useEffect, useState } from "react";
import styles from './WeatherCard.module.css'
import { $user } from "../states/user";
import useRXjs from "../hooks/useRXjs";
import {delCity, saveCity} from '../util/favMgmt.js'
import PrefSuggestion from "./PrefSuggestion";
import {useDisclosure, useToast} from '@chakra-ui/react'
import HourlyForecast from "./HourlyForecast";
import Wind from "./Wind";

export const WeatherCard = ({weather, favCities, setFavCities}) => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const user = useRXjs($user)
    const [favoriteID, setFavoriteID] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    console.log(weather);
    useEffect(() => {
        setFavoriteID('')
        favCities.map(city => {
            if (city.lat === weather.location.lat && city.lon === weather.location.lon) setFavoriteID(city._id)
        })
    }, [weather, favCities]);

    const handleCity = async (mode)=>{
        setIsLoading(true)
        let resp
        mode ? resp = await saveCity(weather.location) : resp = await delCity(favoriteID)
        setIsLoading(false)
        setFavCities(resp)
        toast({
            title: weather.location.name + (mode ? ` saved as favorite` : ` removed from favorites`),
            status: (mode ? 'success' : 'info'),
            duration: 4000,
            isClosable: true,
          })
    }

    return (
      <>
        <div className={styles.card}>
          {user && !isLoading && (
            <div className={styles.star}>
              {favoriteID.length ? (
                <span className="material-icons-outlined" style={{ color: "yellow" }} onClick={() => handleCity(0)}>star</span>
              ) : (
                <span className="material-icons-outlined" style={{ color: "yellow" }} onClick={() => handleCity(1)}>star_border</span>
              )}
            </div>
          )}
          {isLoading && <div className={styles.loader}></div>}
          <p className={styles.city}>{weather.location.name}</p>
          <p className={styles.country}>{weather.location.country}</p>
          <p>{weather.current.last_updated}</p>
          <div className={styles.tempContainer} onClick={onOpen}>
            <div className={user ? styles.loginTemp : styles.temp}>
              <span>{weather.current.temp_c}</span>
              <span>°C</span>
            </div>
            <img src={weather.current.condition.icon} alt="icon.png" />
          </div>
          <div className={styles.windContainer}>
            
            <Wind wind={weather.current.wind_dir} windSpeed={weather.current.wind_kph}/>
          </div>
          <div className={styles.hourlyForecast}>
            <div className={styles.scrollable}>
              {weather.forecast.forecastday[0].hour.map((hour) => (
                <HourlyForecast key={hour.time} {...{ hour }} />
              ))}
            </div>
          </div>
        </div>
        {user && <PrefSuggestion {...{ isOpen, onClose }} temp={weather.current.temp_c}/>}
      </>
    );
}