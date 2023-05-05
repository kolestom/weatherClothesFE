import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { $user, setUser, logout } from "../states/user";
import useRXjs from "../hooks/useRXjs";
import jwtDecode from "jwt-decode";
import { client } from "../api/own";
import { Button, Select } from "@chakra-ui/react";
import { PrefCreate } from "../comps/PrefCreate";
import { PrefCardAdmin } from "../comps/PrefCardAdmin";
import styles from './Admin.module.css'



export const Admin = () => {
    const user = useRXjs($user)
    const navigate = useNavigate()
    const [prefs, setPrefs] = useState();
    
    
    useEffect(()=>{
        if (localStorage.getItem('token')){
            setUser(jwtDecode(localStorage.getItem('token'))) // verify kell a lejarathoz
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
    return (
      <div className={styles.adminMain}>
        <div className={styles.prefContainer}>
          {prefs ? (
            prefs.map(pref => <PrefCardAdmin key={pref._id} {...{ pref, setPrefs }} />)
          ) : (
            <div className={styles.loader}></div>
          )}
        </div>
        <PrefCreate {...{ setPrefs }} />
      </div>
    );
}