import { useState } from "react";
import { Forecast } from "./Forecast";
import styles from './WeatherCard.module.css'
export const WeatherCard = ({weather}) => {
    const [selectedDay, setSelectedDay] = useState();
    return ( 
        <div className={styles.card}>
            <div className="main">
                <p>{weather.location.name}</p>
                <p>{weather.location.country}</p>
                <p>{weather.current.last_updated}</p>
                <p>{weather.current.temp_c} C</p>
                <p>Wind direction: {weather.current.wind_dir}</p>
                <p>Wind: {weather.current.wind_kph} Kph</p>
                <img src={weather.current.condition.icon} alt="icon.png" />

            </div>
            <Forecast {...{weather}}/>
            
        </div>
     );
}