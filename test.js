import { useState } from "react";

const [pref, setpref] = useState({
    prefName: '',
    temp: 0,
    jacket: false
});

console.log(pref);
setpref({...pref, prefName: 'teszt'})

console.log(pref);