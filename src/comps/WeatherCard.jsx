import { useEffect, useState } from "react";
import styles from './WeatherCard.module.css'
import { $user } from "../states/user";
import useRXjs from "../hooks/useRXjs";
import {delCity, saveCity} from '../util/favMgmt.js'
import PrefSuggestion from "./PrefSuggestion";
import {useDisclosure, useToast} from '@chakra-ui/react'

export const WeatherCard = ({weather, favCities, setFavCities}) => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const user = useRXjs($user)
    const [favoriteID, setFavoriteID] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setFavoriteID('')
        favCities.map(city => {
            if (city.lat === weather.location.lat && city.lon === weather.location.lon) setFavoriteID(city._id)
        })
    }, [weather, favCities]);

    const handleCity = async (mode)=>{
        setIsLoading(true)
        let resp
        mode ? resp = await delCity(favoriteID) : resp = await saveCity(weather.location)
        setIsLoading(false)
        setFavCities(resp)
        toast({
            title: weather.location.name + (mode ? ` removed from favorites` : ` saved as favorite`),
            status: (mode ? 'info' : 'success'),
            duration: 4000,
            isClosable: true,
          })
    }

    return ( 
        <>
            <div className={styles.card}>
                    {user && !isLoading && <div>{favoriteID.length ?
                        <span className="material-icons-outlined" style={{color: 'yellow'}} onClick={()=>handleCity(1)}>star</span>
                        :
                        <span className="material-icons-outlined" style={{color: 'yellow'}} onClick={()=>handleCity(0)}>star_border</span>
                        }
                        </div>}
                    {isLoading && <div className={styles.loader}></div>}
                    <p className={styles.city}>{weather.location.name}</p>
                    <p className={styles.country}>{weather.location.country}</p>
                    <p>{weather.current.last_updated}</p>
                    <p className={user ? styles.loginTemp : styles.temp} onClick={onOpen}>{weather.current.temp_c} °C</p>
                    <p>Wind direction: {weather.current.wind_dir}</p>
                    <p>Wind speed: {weather.current.wind_kph} Kph</p>
                    <img src={weather.current.condition.icon} alt="icon.png" />
            </div>
            {user && <PrefSuggestion {...{isOpen, onClose}} temp={weather.current.temp_c}/>}
        </>
     );
}