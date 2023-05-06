import { client } from "../api/own";
import { useState, useEffect } from "react";
import styles from './PrefCard.module.css'
import { logout } from "../states/user";

export const PrefCard = ({temp}) => {

    const [pref, setPref] = useState();
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        const init = async() =>{
            try {
                setPref((await client.get(`/api/pref/${temp}`, {headers:{Authorization:`Bearer: ${localStorage.getItem('token')}`}})).data)
            } catch (error) {
                if (error.response.status === 404) setErrorMsg(error.response.data)
                if (error.response.status === 401) {
                    setErrorMsg(error.response.data)
                    setTimeout(logout,2000)
                }
            }
        }
        init()
    }, []);
    return ( 
        <>
            {pref && !errorMsg &&
                <div className={styles.prefContainer}>
                    <h1>Clothes suggestion for {temp} °C</h1>
                    {pref.clothes.cap && <img src="../src/img/cap.png"/>}
                    {pref.clothes.scarf && <img src="../src/img/scarf.png"/>}
                    {pref.clothes.jacket && <img src="../src/img/jacket.png"/>}
                    {pref.clothes.thermoTop>0 && <h1>Number of thermo tops: {pref.clothes.thermoTop}</h1>}
                    {pref.clothes.gloves.short ?
                        <img src="../src/img/glovesShort.png"/> 
                        : pref.clothes.gloves.long ?
                        <img src="../src/img/glovesLong.png"/>
                        : <img src="../src/img/glovesThermo.png"/>}
                    {pref.clothes.pants.shorts ? <img src="../src/img/pantsShorts.png"/> : <img src="../src/img/pantsLong.png"/>}
                    {pref.clothes.thermoLeggins && <img src="../src/img/thermoLeggins.png"/>}
                    {pref.clothes.warmSocks>0 && <h1>Number of warm socks: {pref.clothes.warmSocks}</h1>}
                    {pref.notes && <p>Notes: {pref.notes}</p>}
                </div>}
            {errorMsg && <h1>{errorMsg}</h1>}
        </>
     );
}