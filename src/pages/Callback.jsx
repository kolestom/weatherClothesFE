// import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { login } from "../states/user";

const Callback = () => {
    const navigate = useNavigate()
    useEffect(() => {
        
        const urlSearchParams = new URLSearchParams(window.location.search)
        const code = urlSearchParams.get("code")
        if (code){   
            login(code)
            navigate('/')
        }

    }, []);

    
    return ( 
        <>
            <h2>Callback Page</h2>
        </>
     );
}
export default Callback