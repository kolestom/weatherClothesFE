import { useEffect, useState } from "react";
import styles from './WeatherCard.module.css'
import { $user } from "../states/user";
import useRXjs from "../hooks/useRXjs";
import { PrefCard } from "./PrefCard";
import { client } from "../api/own";
import {handleDelCity, handleSaveCity} from '../util/favMgmt.js'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    useDisclosure
  } from '@chakra-ui/react'

export const WeatherCard = ({weather, favCities, setFavCities}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const user = useRXjs($user)
    const [isFavorite, setIsFavorite] = useState({fav: false, _id: ''});
    
    useEffect(() => {
        setIsFavorite({fav: false, _id: ''})
        favCities.map(city => {
            if (city.lat === weather.location.lat && city.lon === weather.location.lon) setIsFavorite({fav: true, _id: city._id})
        })
    }, [weather, favCities]);

    return ( 
        <>
            <div className={styles.card}>
                    {user &&  <div>{isFavorite.fav ?
                        <span className="material-icons-outlined" style={{color: 'yellow'}} onClick={()=>handleDelCity(isFavorite._id,setFavCities)}>star</span>
                        :
                        <span className="material-icons-outlined" style={{color: 'yellow'}} onClick={()=>handleSaveCity(weather.location,setFavCities)}>star_border</span>
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
            {user && <Modal isOpen={isOpen} size={'md'} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalBody>
                                <PrefCard temp={weather.current.temp_c}/>
                            </ModalBody>
                            <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>}
        </>
     );
}