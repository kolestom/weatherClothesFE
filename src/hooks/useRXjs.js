import { BehaviorSubject } from "rxjs";
import { useState , useEffect} from "react";

const useRXjs = (data) => {  //BehaviorSubject-tel lesz a data-n pl a getValue fuggveny
    const [val, setVal] = useState(data.getValue());

    useEffect(()=>{
        // data.subscribe((nexValue: T) => setVal(nexValue)) // ua, mint lent
        const subscription = data.subscribe(setVal)
        return () => subscription.unsubscribe()  // uriti a subscription-t (leiratkozas)
    },[])
    return val;
}
 
export default useRXjs;