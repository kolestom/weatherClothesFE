import styles from './PrefUpdate.module.css'
import { client } from '../api/own';
import { useEffect, useState } from "react";
import { Button, Input, RadioGroup, Radio, Stack} from '@chakra-ui/react';
import { $user } from '../states/user';
import useRXjs from '../hooks/useRXjs'
import { handleGloves, handlePants } from '../util/handleClothes';
import { prefMgmt } from '../util/prefMgmt';


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
        <>
            <h1>Update preference details</h1>
            <div className={styles.createInputs}>
            <Input width={"70%"} placeholder={prefName} value={prefName} onChange={(e) => setPrefName(e.target.value)}/>
            
            <Input width={"20%"} placeholder={minTemp} type="number" onChange={(e) => setMinTemp(parseInt(e.target.value))}/>
            <Input width={"20%"} placeholder={maxTemp} type="number" onChange={(e) => setMaxTemp(parseInt(e.target.value))}/>
            
            <div>
                <input type="checkbox" id="cap" name="cap" checked={cap} value={cap} onChange={()=>setCap(prev => !prev)}/>
                <label htmlFor="cap">Cap</label>
            </div>
            <div>
                <input type="checkbox" id="neckWarmer" checked={scarf} name="neckWarmer" value={scarf} onChange={()=>setScarf(prev => !prev)}/>
                <label htmlFor="neckWarmer">Neck warmer</label>
            </div>
            <div>
                <input type="checkbox" id="jacket" checked={jacket} name="jacket" value={jacket} onChange={()=>setJacket(prev => !prev)}/>
                <label htmlFor="jacket">Jacket</label>
            </div>
            <div>
                <Input width={"20%"} placeholder={thermoTop} type="number" id='thermoTop' onChange={(e) => setThermoTop(parseInt(e.target.value))}/>
                <label htmlFor="thermoTop">Thermo top(s)</label>
            </div>
            <RadioGroup defaultValue={shortGloves ? 's' : longGloves ? 'l': 't'} onChange={e=>handleGloves(e, setShortGloves, setLongGloves, setThermoGloves)}>
                <Stack direction='row'>
                    <Radio value='s'>Short</Radio>
                    <Radio value='l'>Long</Radio>
                    <Radio value='t'>Thermo</Radio>
                </Stack>
            </RadioGroup>
            <RadioGroup defaultValue={shortPants ? 's': 'l'} onChange={e=>handlePants(e, setShortPants, setLongPants)}>
                <Stack direction='row'>
                    <Radio value='s'>Short</Radio>
                    <Radio value='l'>Long</Radio>
                </Stack>
            </RadioGroup>
            <div>
                <input type="checkbox" id="leggins" checked={thermoLeggins} name="leggins" value={thermoLeggins} onChange={()=>setThermoLeggins(prev => !prev)}/>
                <label htmlFor="leggins">Leggins</label>
            </div>
            <div>
                <Input width={"20%"} placeholder={warmSocks} type="number" id='warmSocks' onChange={(e) => setWarmSocks(parseInt(e.target.value))}/>
                <label htmlFor="warmSocks">Warm socks</label>
            </div>
            <Input width={"70%"} placeholder='Notes' value={notes} onChange={(e) => setNotes(e.target.value)}/>
            <Button width={"50%"} colorScheme='blue' isDisabled={isDisabled} variant="solid" onClick={updatePref}>Update preference</Button>
            <Button width={"50%"} colorScheme='red' variant="solid" onClick={handleDelete}>Delete preference</Button>
        </div>
        </>
     );
}