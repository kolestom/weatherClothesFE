// import axios from "axios";
import { useEffect } from "react";
import sendCode from "../util/sendCode";

const CallbackPage = () => {
    

    useEffect(() => {
        
        const urlSearchParams = new URLSearchParams(window.location.search)
        const code = urlSearchParams.get("code")
        console.log(code);
        
        const init = async () =>{

            const data = await sendCode(code)
            console.log(data);
            
        }
        init()
    }, []);

    
    return ( 
        <>
            <h2>Callback Page</h2>
        </>
     );
}
 
export default CallbackPage;