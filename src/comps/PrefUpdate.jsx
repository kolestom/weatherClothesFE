import styles from './PrefUpdate.module.css'
import { client } from '../api/own';
import { useEffect, useState } from "react";
import { Button} from '@chakra-ui/react';
import { $user, logout } from '../states/user';
import useRXjs from '../hooks/useRXjs'
import { prefMgmt } from '../util/prefMgmt';
import MainPrefComp from './prefComps/MainPrefComp';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';


export const PrefUpdate = ({selectedPref, setPrefs, onClose}) => {
    const toast = useToast()
    const navigate = useNavigate()
    const user = useRXjs($user)
    const [pref, setPref] = useState({
        prefName: selectedPref.prefName,
        minTemp: selectedPref.minTemp,
        maxTemp: selectedPref.maxTemp,
        cap: selectedPref.clothes.cap,
        scarf: selectedPref.clothes.scarf,
        jacket: selectedPref.clothes.jacket,
        thermoTop: selectedPref.clothes.thermoTop,
        shortGloves: selectedPref.clothes.gloves.short,
        longGloves: selectedPref.clothes.gloves.long,
        thermoGloves: selectedPref.clothes.gloves.thermo,
        shortPants: selectedPref.clothes.pants.shorts,
        longPants: selectedPref.clothes.pants.longs,
        thermoLeggins: selectedPref.clothes.thermoLeggins,
        warmSocks: selectedPref.clothes.warmSocks,
        notes: selectedPref.notes
    });
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(()=>{
        if(pref.prefName && pref.minTemp<pref.maxTemp && pref.thermoTop >= 0 && pref.warmSocks >= 0) setIsDisabled(false)
        else setIsDisabled(true)
    },[pref.prefName, pref.minTemp, pref.maxTemp, pref.thermoTop, pref.warmSocks])


    const updatePref = async() => {
        try {
            const response = await prefMgmt(
                pref,
                user.sub,
                selectedPref._id
              )
            setPrefs(response.data)
            toast({
                title: 'Preference updated.',
                status: 'success',
                duration: 4000,
                isClosable: true,
              })
            onClose()  
        } catch (error) {
            alert(error.response.data)
            if(error.response.status===401) {
                onClose()
                logout()
                navigate('/')
            }
        }
    }

    const handleDelete = async () =>{
        const conf = confirm("Are you sure you want to delete this preference?")
        if (conf) {
            try {
                const resp = await client.delete(`/api/pref/${selectedPref._id}`, {
                    headers: { Authorization: `Bearer: ${localStorage.getItem('token')}`}
                })
                setPrefs(resp.data)
                toast({
                    title: 'Preference deleted.',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                  })
                onClose()
            } catch (error) {
                alert(error.response.data)
                if(error.response.status===401) {
                    onClose()
                    logout()
                    navigate('/')
                }
            }
        }
    }

    return ( 
        <div className={styles.createInputs}>
            <h1>Update preference details</h1>
            <MainPrefComp {...{pref, setPref}}/>
            <div className={styles.buttons}>
                <Button width={"50%"} colorScheme='blue' isDisabled={isDisabled} variant="solid" onClick={updatePref}>Update preference</Button>
                <Button width={"50%"} colorScheme='red' variant="solid" onClick={handleDelete}>Delete preference</Button>
            </div>
        </div>
     );
}