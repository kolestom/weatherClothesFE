import { RadioGroup, Stack, Radio } from '@chakra-ui/react';
import styles from '../PrefCreate.module.css'
import { handlePants } from '../../util/handleClothes';
import InputNumber from './InputNumber';

const Legs = ({shortPants, setShortPants, setLongPants, thermoLeggins, setThermoLeggins, warmSocks, setWarmSocks}) => {
    return ( 
        <div className={styles.legs}>Legs: 
                <div className={styles.pants}>Pants: 
                    <RadioGroup defaultValue={shortPants ? 's': 'l'} onChange={e=>handlePants(e, setShortPants, setLongPants)}>
                        <Stack direction='row'>
                            <Radio size='sm' value='s'>Short</Radio>
                            <Radio size='sm' value='l'>Long</Radio>
                        </Stack>
                    </RadioGroup>
                </div>
                <div className={styles.leggins}>
                    <label htmlFor="leggins">Leggins</label>
                    <input type="checkbox" id="leggins" checked={thermoLeggins} name="leggins" value={thermoLeggins} onChange={()=>setThermoLeggins(prev => !prev)}/>
                </div>
                <div className={styles.socks}>
                        <label htmlFor="warmSocks">Warm socks</label>
                        <InputNumber value={warmSocks} setValue={setWarmSocks}/>
                </div>
            </div>
     );
}
 
export default Legs;
