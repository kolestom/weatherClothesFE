import { RadioGroup, Stack, Radio, Input } from '@chakra-ui/react';
import styles from '../PrefCreate.module.css'
import { handlePants } from '../../util/handleClothes';

const Legs = ({shortPants, setShortPants, setLongPants, thermoLeggins, setThermoLeggins, warmSocks, setWarmSocks}) => {
    return ( 
        <div className={styles.legs}>Legs: 
                <div className={styles.pants}>Pants: 
                    <RadioGroup defaultValue={shortPants ? 's': 'l'} onChange={e=>handlePants(e, setShortPants, setLongPants)}>
                        <Stack direction='row'>
                            <Radio value='s'>Short</Radio>
                            <Radio value='l'>Long</Radio>
                        </Stack>
                    </RadioGroup>
                </div>
                <div>
                    <input type="checkbox" id="leggins" checked={thermoLeggins} name="leggins" value={thermoLeggins} onChange={()=>setThermoLeggins(prev => !prev)}/>
                    <label htmlFor="leggins">Leggins</label>
                </div>
                <div className={styles.socks}>
                        <label htmlFor="warmSocks">Warm socks</label>
                        <Input size='sm' width={"20%"} placeholder={warmSocks ? warmSocks : 0} type="number" id='warmSocks' onChange={(e) => setWarmSocks(parseInt(e.target.value))}/>
                </div>
            </div>
     );
}
 
export default Legs;
