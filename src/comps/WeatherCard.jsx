import { useState } from "react";
import styles from './WeatherCard.module.css'
import { $user } from "../states/user";
import useRXjs from "../hooks/useRXjs";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    useDisclosure
  } from '@chakra-ui/react'

export const WeatherCard = ({weather}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const user = useRXjs($user)
    const [selectedDay, setSelectedDay] = useState();
    return ( 
        <>
            <div className={styles.card} onClick={onOpen}>
                <div className="main">
                    <p>{weather.location.name}</p>
                    <p>{weather.location.country}</p>
                    <p>{weather.current.last_updated}</p>
                    <p>{weather.current.temp_c} C</p>
                    <p>Wind direction: {weather.current.wind_dir}</p>
                    <p>Wind: {weather.current.wind_kph} Kph</p>
                    <img src={weather.current.condition.icon} alt="icon.png" />
                </div>
            </div>
            {user && <Modal isOpen={isOpen} size={'xl'} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalBody>
                            {/* <PrefDetails {...{pref, setPrefs, onClose}}/> */}
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