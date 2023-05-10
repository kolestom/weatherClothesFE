import { RadioGroup, Stack, Radio } from '@chakra-ui/react';
import styles from '../PrefCreate.module.css'
import { handlePants } from '../../util/handleClothes';
import InputSocks from './InputSocks';

const Legs = ({pref, setPref}) => {
    return ( 
        <div className={styles.legs}>Legs: 
            <div className={styles.pants}>Pants: 
                <RadioGroup defaultValue={pref.shortPants ? 's': 'l'} onChange={e=>handlePants(e, pref, setPref)}>
                    <Stack direction='row'>
                        <Radio size='sm' value='s'>Short</Radio>
                        <Radio size='sm' value='l'>Long</Radio>
                    </Stack>
                </RadioGroup>
            </div>
            <div className={styles.leggins}>
                <label htmlFor="leggins">Leggins</label>
                <input
                    type="checkbox"
                    id="leggins"
                    checked={pref.thermoLeggins}
                    name="leggins"
                    value={pref.thermoLeggins}
                    onChange={()=>setPref({...pref, thermoLeggins: !pref.thermoLeggins})}/>
            </div>
            <div className={styles.socks}>
                    <label htmlFor="warmSocks">Warm socks</label>
                    <InputSocks {...{pref, setPref}}/>
            </div>
        </div>
     );
}
 
export default Legs;
