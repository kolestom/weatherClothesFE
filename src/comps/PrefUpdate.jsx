import styles from './PrefUpdate.module.css'
import { client } from '../api/own';
import { useEffect, useState } from "react";
import { Button, Input, RadioGroup, Radio, Stack} from '@chakra-ui/react';
import { $user } from '../states/user';
import useRXjs from '../hooks/useRXjs'
import { handleGloves, handlePants } from '../util/handleClothes';
import { prefMgmt } from '../util/prefMgmt';
import Head from './prefComps/Head';
import UpperBody from './prefComps/UpperBody';


export const PrefUpdate = ({selectedPref, setPrefs, onClose}) => {
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
            console.log(response.data);
            setPrefs(response.data)
            alert("Preference updated successfully") // ne alert, hanem modal
            onClose()  
        } catch (error) {
            alert(error.response.data)
        }
    }

    const handleDelete = async () =>{
        const conf = confirm("Are you sure you want to delete this preference?")
        if (conf) {
            const resp = await client.delete(`/api/pref/${selectedPref._id}`, {
                headers: { Authorization: `Bearer: ${localStorage.getItem('token')}`}
            })
            setPrefs(resp.data)
            onClose()
        }
    }

    return ( 
        <div className={styles.createInputs}>
            <h1>Update preference details</h1>
            <Input width={"70%"} size='sm' placeholder={prefName} value={prefName} onChange={(e) => setPrefName(e.target.value)}/>
            <div className={styles.temps}>
                <p>Min. temp</p>
                <Input width={"20%"} size='sm' placeholder={minTemp ? minTemp : 0} type="number" onChange={e => setMinTemp(parseInt(e.target.value))}/>
                <p>°C</p>
            </div>
            <div className={styles.temps}>
                <p>Min. temp</p>
                <Input width={"20%"} size='sm' placeholder={maxTemp ? maxTemp : 0} type="number" onChange={e => setMaxTemp(parseInt(e.target.value))}/>
                <p>°C</p>
            </div>
            <Head {...{cap, setCap, scarf, setScarf}}/>
            <UpperBody {...{jacket, setJacket, thermoTop, setThermoTop, shortGloves, setShortGloves, longGloves, setLongGloves, setThermoGloves}}/>
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
            <Input width={"70%"} placeholder='Notes' value={notes} onChange={(e) => setNotes(e.target.value)}/>
            <div className={styles.buttons}>
                <Button width={"50%"} colorScheme='blue' isDisabled={isDisabled} variant="solid" onClick={updatePref}>Update preference</Button>
                <Button width={"50%"} colorScheme='red' variant="solid" onClick={handleDelete}>Delete preference</Button>
            </div>
        </div>
     );
}