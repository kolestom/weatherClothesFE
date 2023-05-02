import styles from './Favorite.module.css'
export const Favorite = ({city, getWeather}) => {
    return (
        <>
          <div className={styles.favorite} onClick={()=>getWeather(`${city.city}, ${city.country}`)}>{city.city}, {city.country}</div>
        </>
      );
}