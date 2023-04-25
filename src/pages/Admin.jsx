import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { $user, setUser } from "../states/user";
import useRXjs from "../hooks/useRXjs";
import jwtDecode from "jwt-decode";
export const Admin = () => {
    const user = useRXjs($user)
    const navigate = useNavigate()
    
    useEffect(()=>{
        if (localStorage.getItem('token')){
            setUser(jwtDecode(localStorage.getItem('token'))) // verify kell a lejarathoz
        } else navigate('/')
    },[])
    return ( 
        <div>
            <h1>Admin Page</h1>
            {user && <h1>{user.name}</h1>}
            <button onClick={()=>navigate('/')}>Home</button>
        </div>
     );
}