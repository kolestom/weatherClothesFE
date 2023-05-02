import styles from './PrefCreate.module.css'
import { useEffect, useState } from "react";
import { Button, Input, RadioGroup, Radio, Stack} from '@chakra-ui/react';
import { client } from '../api/own';
import { $user } from '../states/user';
import useRXjs from '../hooks/useRXjs';
import { handleGloves, handlePants } from '../util/handleClothes';
import {prefMgmt} from '../util/prefMgmt'

export const PrefCreate = ({setPrefs}) => {
    const user = useRXjs($user)
    const [prefName, setPrefName] = useState('');
    const [minTemp, setMinTemp] = useState(0);
    const [maxTemp, setMaxTemp] = useState(0);
    const [cap, setCap] = useState(false);
    const [scarf, setScarf] = useState(false);
    const [jacket, setJacket] = useState(false);
    const [thermoTop, setThermoTop] = useState(0);
    const [shortGloves, setShortGloves] = useState(true);
    const [longGloves, setLongGloves] = useState(false);
    const [thermoGloves, setThermoGloves] = useState(false);
    const [shortPants, setShortPants] = useState(true);
    const [longPants, setLongPants] = useState(false);
    const [thermoLeggins, setThermoLeggins] = useState(false);
    const [warmSocks, setWarmSocks] = useState(0);
    const [notes, setNotes] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    
    useEffect(()=>{
        if(prefName && minTemp<maxTemp && thermoTop >= 0 && warmSocks >= 0) setIsDisabled(false)
        else setIsDisabled(true)
    },[prefName, minTemp, maxTemp, thermoTop, warmSocks])
    
    const createPref = async() => {
        try {
            const response = await prefMgmt(
              prefName,
              user.sub,
              minTemp,
              maxTemp,
              cap,
              scarf,
              jacket,
              thermoTop,
              shortGloves,
              longGloves,
              thermoGloves,
              shortPants,
              longPants,
              thermoLeggins,
              warmSocks,
              notes
            )
            console.log(response.data);
            setPrefs(response.data)
            
        } catch (error) {
            alert(error.response.data)
        }
    }
    
    return ( 
        <div className={styles.createInputs}>
            <Input width={"70%"} placeholder='Preference name' value={prefName} onChange={(e) => setPrefName(e.target.value)}/>
            
            <Input width={"20%"} placeholder={0} type="number" onChange={(e) => setMinTemp(parseInt(e.target.value))}/>
            <Input width={"20%"} placeholder={0} type="number" onChange={(e) => setMaxTemp(parseInt(e.target.value))}/>
            
            <div>
                <label htmlFor="cap">Cap</label>
                <input type="checkbox" id="cap" name="cap" value={cap} onChange={()=>setCap(prev => !prev)}/>
            </div>
            <div>
                <label htmlFor="neckWarmer">Neck warmer</label>
                <input type="checkbox" id="neckWarmer" name="neckWarmer" value={scarf} onChange={()=>setScarf(prev => !prev)}/>
            </div>
            <div>
                <label htmlFor="jacket">Jacket</label>
                <input type="checkbox" id="jacket" name="jacket" value={jacket} onChange={()=>setJacket(prev => !prev)}/>
            </div>
            <div>
                <label htmlFor="thermoTop">Thermo top(s)</label>
                <Input width={"20%"} placeholder={0} type="number" id='thermoTop' onChange={(e) => setThermoTop(parseInt(e.target.value))}/>
            </div>
            <RadioGroup defaultValue='s' onChange={e=>handleGloves(e, setShortGloves, setLongGloves, setThermoGloves)}>
                <Stack direction='row'>
                    <Radio value='s'>Short</Radio>
                    <Radio value='l'>Long</Radio>
                    <Radio value='t'>Thermo</Radio>
                </Stack>
            </RadioGroup>
            <RadioGroup defaultValue='s' onChange={e=>handlePants(e, setShortPants, setLongPants)}>
                <Stack direction='row'>
                    <Radio value='s'>Short</Radio>
                    <Radio value='l'>Long</Radio>
                </Stack>
            </RadioGroup>
            <div>
                <label htmlFor="leggins">Leggins</label>
                <input type="checkbox" id="leggins" name="leggins" value={thermoLeggins} onChange={()=>setThermoLeggins(prev => !prev)}/>
            </div>
            <div>
                <Input width={"20%"} placeholder={0} type="number" id='warmSocks' onChange={(e) => setWarmSocks(parseInt(e.target.value))}/>
                <label htmlFor="warmSocks">Warm socks</label>
            </div>
            <Input width={"70%"} placeholder='Notes' value={notes} onChange={(e) => setNotes(e.target.value)}/>
            <Button width={"50%"} colorScheme='blue' isDisabled={isDisabled} onClick={createPref} variant="solid">Create preference</Button>
        </div>
     );
}