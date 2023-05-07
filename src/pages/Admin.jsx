import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser, logout } from "../states/user";
import jwtDecode from "jwt-decode";
import { client } from "../api/own";
import { Select, useDisclosure } from "@chakra-ui/react";
import { PrefCreate } from "../comps/PrefCreate";
import styles from './Admin.module.css'
import { PrefCardAdmin } from "../comps/PrefCardAdmin";

export const Admin = () => {
    const navigate = useNavigate()
    const [prefs, setPrefs] = useState()
    const [selectedPref, setSelectedPref] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedOption, setSelectedOption] = useState('')
    
    
    useEffect(()=>{
        if (localStorage.getItem('token')){
            setUser(jwtDecode(localStorage.getItem('token')))
            const init = async () =>{
                try {
                    setPrefs((await client.get("/api/pref", {
                        headers: {
                          Authorization: `Bearer: ${localStorage.getItem('token')}`
                        }
                      })).data)
                    } catch (error) {
                        console.log(error.message);
                        alert("Your session expired. Please, log in again")
                        logout()
                        navigate('/')
                    }
                }
                init()
        } else navigate('/')
    },[])

    const handlePrefUpdate = (e) =>{
        if (e.target.value){
            setSelectedPref((prefs.filter(pref => pref._id === e.target.value))[0])
            setSelectedOption('')
            onOpen()
        }
    }

    return (
      <div className={styles.adminMain}>
        <div className={styles.prefContainer}>
          {prefs ? (
            <Select value={selectedOption} placeholder="Select a preference to update" onChange={handlePrefUpdate}>
                {prefs.map(pref => <option value={pref._id} key={pref._id}>{pref.prefName}, min: {pref.minTemp} °C, max: {pref.maxTemp} °C</option>)}
            </Select>
          ) : (
            <div className={styles.loader}></div>
          )}
          {selectedPref && <PrefCardAdmin {...{selectedPref, setPrefs, isOpen, onClose}}/>}
        </div>
        <PrefCreate {...{ setPrefs }} />
      </div>
    );
}