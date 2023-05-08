import { handleGloves } from "../../util/handleClothes";
import styles from '../PrefCreate.module.css'
import {RadioGroup, Radio, Stack} from '@chakra-ui/react';
import InputNumber from "./InputNumber";

const UpperBody = ({jacket, setJacket, thermoTop, setThermoTop, shortGloves, setShortGloves, longGloves, setLongGloves, setThermoGloves}) => {

    return ( 
        <div className={styles.upperBody}>
            <div className={styles.torso}>
                <span>Torso: </span>
                <div className={styles.torsoCont}>
                    <div className={styles.jacket}>
                        <label htmlFor="jacket">Jacket</label>
                        <input type="checkbox" id="jacket" checked={jacket} name="jacket" value={jacket} onChange={()=>setJacket(prev => !prev)}/>
                    </div>
                    <div className={styles.thermoTop}>
                        <label htmlFor="thermoTop">Thermo top(s)</label>
                        <InputNumber value={thermoTop} setValue={setThermoTop}/>
                    </div>
                </div>
            </div>
            <div className={styles.gloves}>Gloves:
                <RadioGroup defaultValue={shortGloves ? 's' : longGloves ? 'l': 't'} onChange={e=>handleGloves(e, setShortGloves, setLongGloves, setThermoGloves)}>
                    <Stack direction='row'>
                        <Radio size='sm' value='s'>Short</Radio>
                        <Radio size='sm' value='l'>Long</Radio>
                        <Radio size='sm' value='t'>Thermo</Radio>
                    </Stack>
                </RadioGroup>
            </div>
        </div>
     );
}
 
export default UpperBody;