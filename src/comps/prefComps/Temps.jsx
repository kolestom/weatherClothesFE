import { RadioGroup, Stack, Radio, Input } from '@chakra-ui/react';
import styles from '../PrefCreate.module.css'

const Temps = ({minTemp, setMinTemp, maxTemp, setMaxTemp}) => {
    return ( 
        <>
            <div className={styles.temps}>
                <p>Min. temp</p>
                <Input width={"20%"} size='sm' placeholder={minTemp ? minTemp : 0} type="number" onChange={e => setMinTemp(parseInt(e.target.value))}/>
                <p>°C</p>
            </div>
            <div className={styles.temps}>
                <p>Min. temp</p>
                <Input width={"20%"} size='sm' placeholder={maxTemp ? maxTemp : 0} type="number" onChange={e => setMaxTemp(parseInt(e.target.value))}/>
                <p>°C</p>
            </div>
        </>
     );
}
 
export default Temps;