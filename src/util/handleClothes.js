
export const handleGloves = (e, setShortGloves, setLongGloves, setThermoGloves) =>{
    if (e==='l') {
        setShortGloves(false)
        setLongGloves(true)
        setThermoGloves(false)
    }
    if (e==='t') {
        setShortGloves(false)
        setLongGloves(false)
        setThermoGloves(true)
    }
    if (e==='s') {
        setShortGloves(true)
        setLongGloves(false)
        setThermoGloves(false)
    }
}
export const handlePants = (e, setShortPants, setLongPants) =>{
    if (e==='l') {
        setShortPants(false)
        setLongPants(true)
    }
    if (e==='s') {
        setShortPants(true)
        setLongPants(false)
    }
}