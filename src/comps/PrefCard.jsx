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
                setErrorMsg(error.response.data)
                if (error.response.status === 401) setTimeout(logout,3000)
            }
        }
        init()
    }, []);
    return ( 
        <>
            {pref && !errorMsg &&
                <div className={styles.prefContainer}>
                    <h1>Clothes suggestion for {temp} °C</h1>
                    {pref.clothes.cap && <img className={styles.capGloves} src="../src/img/cap.png"/>}
                    {pref.clothes.scarf && <img className={styles.smalls} src="../src/img/scarf.png"/>}
                    <div className={styles.upperContainer}>
                        {pref.clothes.gloves.short ?
                            <img className={styles.capGloves} src="../src/img/glovesShort.png"/> 
                            : pref.clothes.gloves.long ?
                            <img className={styles.capGloves} src="../src/img/glovesLong.png"/>
                            : <img className={styles.capGloves} src="../src/img/glovesThermo.png"/>}
                        {pref.clothes.jacket && <img src="../src/img/jacket.png"/>}
                        {pref.clothes.thermoTop>0 &&
                            <div className={styles.thermoTopContainer}>
                                <img src="../src/img/sweater.png"/>
                                <h1>Thermo top: {pref.clothes.thermoTop}</h1>
                            </div> }
                    </div>
                    <div className={styles.pantsContainer}>
                        {pref.clothes.pants.shorts ? <img src="../src/img/pantsShorts.png"/> : <img src="../src/img/pantsLong.png"/>}
                        {pref.clothes.thermoLeggins && <img src="../src/img/thermoLeggins.png"/>}
                    </div>
                    {pref.clothes.warmSocks>0 && 
                        <div className={styles.socksContainer}>
                            <img src="../src/img/socks.png"/>
                            <h1>Warm socks: {pref.clothes.warmSocks}</h1>
                        </div>}
                    {pref.notes && <p>Notes: {pref.notes}</p>}
                </div>}
            {errorMsg && <h1>{errorMsg}</h1>}
        </>
     );
}