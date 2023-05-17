import styles from './PrefCreate.module.css'
import { useEffect, useState } from "react";
import { Button, useToast} from '@chakra-ui/react';
import { $user } from '../states/user';
import useRXjs from '../hooks/useRXjs';
import {prefMgmt} from '../util/prefMgmt'
import MainPrefComp from './prefComps/MainPrefComp';

export const PrefCreate = ({setPrefs}) => {
    const user = useRXjs($user)
    const [pref, setPref] = useState({
        prefName: '',
        minTemp: 0,
        maxTemp: 0,
        cap: false,
        scarf: false,
        jacket: false,
        thermoTop: 0,
        shortGloves: true,
        longGloves: false,
        thermoGloves: false,
        shortPants: true,
        longPants: false,
        thermoLeggins: false,
        warmSocks: 0,
        notes:''
    });
    const [isDisabled, setIsDisabled] = useState(true);
    const toast = useToast()
    
    useEffect(()=>{
        if(pref.prefName && pref.minTemp<pref.maxTemp && pref.thermoTop >= 0 && pref.warmSocks >= 0) setIsDisabled(false)
        else setIsDisabled(true)
    },[pref.prefName, pref.minTemp, pref.maxTemp, pref.thermoTop, pref.warmSocks])
    
    const createPref = async() => {
        try {
            const response = await prefMgmt(
              pref,
              user.sub,
            )
            setPrefs(response.data.sort((a, b) => a.minTemp - b.minTemp))
            toast({
                title: 'Preference creation successful.',
                status: 'success',
                duration: 4000,
                isClosable: true,
              })
            
        } catch (error) {
            alert(error.response.data)
        }
    }
    
    return ( 
        <div className={styles.createInputs}>
            <h2>Create a new preference</h2>
            <MainPrefComp {...{pref, setPref}}/>
            <Button width={"50%"} colorScheme='blue' isDisabled={isDisabled} onClick={createPref} variant="solid">Create preference</Button>
        </div>
     );
}