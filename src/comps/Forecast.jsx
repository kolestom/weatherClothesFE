import styles from './Forecast.module.css'
export const Forecast = ({weather}) => {
    return ( 
        <div className={styles.forecast}>
            {weather.forecast.forecastday.map(day => 
                <span key={day.date}>{day.date}</span>)}
        </div>
     );
}