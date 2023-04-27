import { client } from "../api/own";
import { useState, useEffect } from "react";
import styles from './PrefCard.module.css'

export const PrefCard = ({temp}) => {

    const [pref, setPref] = useState();
    useEffect(() => {
        const init = async() =>{
            setPref((await client.get(`/api/pref/${temp}`, {headers:{Authorization:`Bearer: ${localStorage.getItem('token')}`}})).data)
        }
        init()
    }, []);
    return ( 
        <>
            <h1>Clothes suggestion for {temp} C</h1>
            {pref ? 
                <div className={styles.prefContainer}>
                    {pref.clothes.cap && <h1>Cap</h1>}
                    {pref.clothes.scarf && <h1>Scarf</h1>}
                    {pref.clothes.jacket && <h1>Jacket</h1>}
                    {pref.clothes.thermoTop>0 && <h1>Number of thermo tops: {pref.clothes.thermoTop}</h1>}
                    <div>
                        <span>Gloves: </span>
                        {pref.clothes.gloves.short ? <span>Short</span> : pref.clothes.gloves.long ? <span>Long</span> : <span>Thermo</span>}
                    </div>
                    <div>
                        <span>Pants: </span>
                        {pref.clothes.pants.shorts ? <span>Shorts</span> : <span>Longs</span>}
                    </div>
                    {pref.clothes.thermoLeggins && <h1>Thermo Leggins</h1>}
                    {pref.clothes.warmSocks>0 && <h1>Number of warm socks: {pref.clothes.warmSocks}</h1>}
                    {pref.notes && <p>Notes: {pref.notes}</p>}
                </div>
                :
                <div>
                    <h1>It seems, you don't have a preference for this temperature.</h1>
                    <h1>Go to the admin page and set a preference of your desire.</h1>
                </div>
            }
        </>
     );
}