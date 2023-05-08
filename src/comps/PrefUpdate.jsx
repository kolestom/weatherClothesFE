import styles from './PrefUpdate.module.css'
import { client } from '../api/own';
import { useEffect, useState } from "react";
import { Button} from '@chakra-ui/react';
import { $user, logout } from '../states/user';
import useRXjs from '../hooks/useRXjs'
import { prefMgmt } from '../util/prefMgmt';
import MainPrefComp from './prefComps/MainPrefComp';
import { useNavigate } from 'react-router-dom';


export const PrefUpdate = ({selectedPref, setPrefs, onClose}) => {
    const navigate = useNavigate()
    const user = useRXjs($user)
    const [prefName, setPrefName] = useState(selectedPref.prefName);
    const [minTemp, setMinTemp] = useState(selectedPref.minTemp);
    const [maxTemp, setMaxTemp] = useState(selectedPref.maxTemp);
    const [cap, setCap] = useState(selectedPref.clothes.cap);
    const [scarf, setScarf] = useState(selectedPref.clothes.scarf);
    const [jacket, setJacket] = useState(selectedPref.clothes.jacket);
    const [thermoTop, setThermoTop] = useState(selectedPref.clothes.thermoTop);
    const [shortGloves, setShortGloves] = useState(selectedPref.clothes.gloves.short);
    const [longGloves, setLongGloves] = useState(selectedPref.clothes.gloves.long);
    const [thermoGloves, setThermoGloves] = useState(selectedPref.clothes.gloves.thermo);
    const [shortPants, setShortPants] = useState(selectedPref.clothes.pants.shorts);
    const [longPants, setLongPants] = useState(selectedPref.clothes.pants.longs);
    const [thermoLeggins, setThermoLeggins] = useState(selectedPref.clothes.thermoLeggins);
    const [warmSocks, setWarmSocks] = useState(selectedPref.clothes.warmSocks);
    const [notes, setNotes] = useState(selectedPref.notes);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(()=>{
        if(prefName && minTemp<maxTemp && thermoTop >= 0 && warmSocks >= 0) setIsDisabled(false)
        else setIsDisabled(true)
    },[prefName, minTemp, maxTemp, thermoTop, warmSocks])


    const updatePref = async() => {
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
                notes,
                selectedPref._id
              )
            setPrefs(response.data)
            alert("Preference updated successfully") // ne alert, hanem modal
            onClose()  
        } catch (error) {
            alert(error.response.data)
            onClose()
            logout()
            navigate('/')
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
                onClose()
            } catch (error) {
                alert(error.response.data)
                onClose()
                logout()
                navigate('/')
            }
        }
    }

    return ( 
        <div className={styles.createInputs}>
            <h1>Update preference details</h1>
            <MainPrefComp {...{prefName, setPrefName, minTemp, setMinTemp, maxTemp, setMaxTemp,cap, setCap, scarf, setScarf,
                jacket, setJacket, thermoTop, setThermoTop, shortGloves, setShortGloves, longGloves, setLongGloves, setThermoGloves,
                shortPants, setShortPants, setLongPants, thermoLeggins, setThermoLeggins, warmSocks, setWarmSocks, notes, setNotes
                }}/>
            <div className={styles.buttons}>
                <Button width={"50%"} colorScheme='blue' isDisabled={isDisabled} variant="solid" onClick={updatePref}>Update preference</Button>
                <Button width={"50%"} colorScheme='red' variant="solid" onClick={handleDelete}>Delete preference</Button>
            </div>
        </div>
     );
}