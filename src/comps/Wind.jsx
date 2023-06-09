import styles from './Wind.module.css'
const Wind = ({wind, windSpeed}) => {
    return ( 
        <div className={styles.wind}>
          <span className="material-icons-outlined">air</span>
          {wind}
          <div
            className={
              wind == "S"
                ? null
                : wind == "NNE"
                ? styles.nne
                : wind == "NE"
                ? styles.ne
                : wind == "ENE"
                ? styles.ene
                : wind=='E'
                ? styles.e
                : wind=='ESE'
                ? styles.ese
                : wind=='SE'
                ? styles.se
                : wind=='SSE'
                ? styles.sse
                : wind=='N'
                ? styles.s
                : wind=='SSW'
                ? styles.ssw
                : wind=='SW'
                ? styles.sw
                : wind=='WSW'
                ? styles.wsw
                : wind=='W'
                ? styles.w
                : wind=='WNW'
                ? styles.wnw
                : wind=='NW'
                ? styles.nw
                : styles.nnw
            }
          >
            <span className="material-icons-outlined">north</span>
          </div>
          <p>{windSpeed} Kph</p>
        </div>
     );
}
 
export default Wind;