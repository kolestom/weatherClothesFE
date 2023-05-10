import { Input } from '@chakra-ui/react';
import styles from '../PrefCreate.module.css'

const Temps = ({pref, setPref}) => {
    return ( 
        <>
            <div className={styles.temps}>
                <p>Min. temp</p>
                <Input width={"20%"} size='sm' placeholder={pref.minTemp ? pref.minTemp : 0} type="number"
                    onChange={e => setPref({...pref, minTemp: parseInt(e.target.value)})}/>
                <p>°C</p>
            </div>
            <div className={styles.temps}>
                <p>Max. temp</p>
                <Input width={"20%"} size='sm' placeholder={pref.maxTemp ? pref.maxTemp : 0} type="number"
                    onChange={e => setPref({...pref, maxTemp: parseInt(e.target.value)})}/>
                <p>°C</p>
            </div>
        </>
     );
}
 
export default Temps;