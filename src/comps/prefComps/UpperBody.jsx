import { handleGloves } from "../../util/handleClothes";
import styles from '../PrefCreate.module.css'
import {RadioGroup, Radio, Stack} from '@chakra-ui/react';
import InputThermoTop from "./InputThermoTop";

const UpperBody = ({pref, setPref}) => {

    return ( 
        <div className={styles.upperBody}>
            <div className={styles.torso}>
                <span>Torso: </span>
                <div className={styles.torsoCont}>
                    <div className={styles.jacket}>
                        <label htmlFor="jacket">Jacket</label>
                        <input type="checkbox" id="jacket" checked={pref.jacket} name="jacket" value={pref.jacket}
                            onChange={()=>setPref({...pref, jacket: !pref.jacket})}/>
                    </div>
                    <div className={styles.thermoTop}>
                        <label htmlFor="thermoTop">Thermo top(s)</label>
                        <InputThermoTop {...{pref, setPref}}/>
                    </div>
                </div>
            </div>
            <div className={styles.gloves}>Gloves:
                <RadioGroup defaultValue={pref.shortGloves ? 's' : pref.longGloves ? 'l': 't'}
                    onChange={e=>handleGloves(e, pref, setPref)}>
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