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
    
    useEffect(() => {
        setFavoriteID('')
        favCities.map(city => {
            if (city.lat === weather.location.lat && city.lon === weather.location.lon) setFavoriteID(city._id)
        })
    }, [weather, favCities]);

    const handleSaveCity = async ()=>{
        const resp = await saveCity(weather.location)
        setFavCities(resp)
        toast({
            title: `${weather.location.name} saved as favorite`,
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
    }
    const handleDelCity = async ()=>{
        const resp = await delCity(favoriteID)
        setFavCities(resp)
        toast({
            title: `${weather.location.name} removed from favorites`,
            status: 'info',
            duration: 4000,
            isClosable: true,
          })
    }

    return ( 
        <>
            <div className={styles.card}>
                    {user &&  <div>{favoriteID.length ?
                        <span className="material-icons-outlined" style={{color: 'yellow'}} onClick={()=>handleDelCity(favoriteID)}>star</span>
                        :
                        <span className="material-icons-outlined" style={{color: 'yellow'}} onClick={()=>handleSaveCity(weather.location)}>star_border</span>
                        }
                        </div>}
                    <p>{weather.location.name}</p>
                    <p>{weather.location.country}</p>
                    <p>{weather.current.last_updated}</p>
                    <p className={user ? styles.loginTemp : styles.temp} onClick={onOpen}>{weather.current.temp_c} °C</p>
                    <p>Wind direction: {weather.current.wind_dir}</p>
                    <p>Wind: {weather.current.wind_kph} Kph</p>
                    <img src={weather.current.condition.icon} alt="icon.png" />
            </div>
            {user && <PrefSuggestion {...{isOpen, onClose}} temp={weather.current.temp_c}/>}
        </>
     );
}