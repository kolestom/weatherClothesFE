import styles from './HourlyForecast.module.css'
import PrefSuggestion from "./PrefSuggestion";
import { useDisclosure } from "@chakra-ui/react";
import { $user } from "../states/user";
import useRXjs from "../hooks/useRXjs";

const HourlyForecast = ({hour}) => {
    const user = useRXjs($user)
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <div className={user ? styles.hourContainerLogin : styles.hourContainer} onClick={onOpen}>
                <p>{hour.time.split(' ')[1]}</p>
                <div>
                    <span>{hour.temp_c}</span>
                    <span>°C</span>
                </div>
                <img src={hour.condition.icon} alt="" />
                {/* {hour.wind_dir} {hour.wind_kph} */}
            </div>
            {user && <PrefSuggestion {...{isOpen, onClose}} temp={hour.temp_c}/>}
        </> 
     );
}
 
export default HourlyForecast;