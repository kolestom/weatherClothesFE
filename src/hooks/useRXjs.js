import { BehaviorSubject } from "rxjs";
import { useState , useEffect} from "react";

const useRXjs = (data) => {
    const [val, setVal] = useState(data.getValue());

    useEffect(()=>{
        const subscription = data.subscribe(setVal)
        return () => subscription.unsubscribe()
    },[])
    return val;
}
 
export default useRXjs;