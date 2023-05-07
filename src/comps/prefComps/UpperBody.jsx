import { handleGloves } from "../../util/handleClothes";
import styles from '../PrefCreate.module.css'
import {Input, RadioGroup, Radio, Stack} from '@chakra-ui/react';

const UpperBody = ({jacket, setJacket, thermoTop, setThermoTop, shortGloves, setShortGloves, longGloves, setLongGloves, setThermoGloves}) => {
    return ( 
        <div className={styles.upperBody}>
                <div className={styles.torso}>Torso
                    <div>
                        <div>
                            <label htmlFor="jacket">Jacket</label>
                            <input type="checkbox" id="jacket" checked={jacket} name="jacket" value={jacket} onChange={()=>setJacket(prev => !prev)}/>
                        </div>
                        <div>
                            <label htmlFor="thermoTop">Thermo top(s)</label>
                            <Input width={"20%"} placeholder={thermoTop ? thermoTop : 0} type="number" id='thermoTop' onChange={(e) => setThermoTop(parseInt(e.target.value))}/>
                        </div>
                    </div>
                </div>
                <div className={styles.gloves}>Gloves:
                    <RadioGroup defaultValue={shortGloves ? 's' : longGloves ? 'l': 't'} onChange={e=>handleGloves(e, setShortGloves, setLongGloves, setThermoGloves)}>
                        <Stack direction='row'>
                            <Radio value='s'>Short</Radio>
                            <Radio value='l'>Long</Radio>
                            <Radio value='t'>Thermo</Radio>
                        </Stack>
                    </RadioGroup>
                </div>
            </div>
     );
}
 
export default UpperBody;