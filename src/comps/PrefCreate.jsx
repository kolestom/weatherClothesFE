import styles from './PrefCreate.module.css'
import { useEffect, useState } from "react";
import { Button,} from '@chakra-ui/react';
import { $user } from '../states/user';
import useRXjs from '../hooks/useRXjs';
import {prefMgmt} from '../util/prefMgmt'
import MainPrefComp from './prefComps/MainPrefComp';

export const PrefCreate = ({setPrefs}) => {
    const user = useRXjs($user)
    // const [pref, setPref] = useState({
    //     prefName: '',
    //     minTemp: 0,
    //     maxTemp: 0,
    //     cap: false,
    //     scarf: false,
    //     jacket: false,
    //     thermoTop:0,
    //     shortGloves: true,
    //     longGloves: false,
    //     thermoGloves: false,
    //     shortPants: true,
    //     longPants: false,
    //     thermoLeggins: false,
    //     warmSocks: 0,
    //     notes: ''
    // });
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
            <h2>Create a new preference</h2>
            <MainPrefComp {...{prefName, setPrefName, minTemp, setMinTemp, maxTemp, setMaxTemp,cap, setCap, scarf, setScarf,
                jacket, setJacket, thermoTop, setThermoTop, shortGloves, setShortGloves, longGloves, setLongGloves, setThermoGloves,
                shortPants, setShortPants, setLongPants, thermoLeggins, setThermoLeggins, warmSocks, setWarmSocks, notes, setNotes
                }}/>
            <Button width={"50%"} colorScheme='blue' isDisabled={isDisabled} onClick={createPref} variant="solid">Create preference</Button>
        </div>
     );
}