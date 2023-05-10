
export const handleGloves = (e, pref, setPref) =>{
    if (e === 'l') {
        setPref({ ...pref, shortGloves: false, longGloves: true, thermoGloves: false });
      }
      if (e === 't') {
        setPref({ ...pref, shortGloves: false, longGloves: false, thermoGloves: true });
      }
      if (e === 's') {
        setPref({ ...pref, shortGloves: true, longGloves: false, thermoGloves: false });
      }
}
export const handlePants = (e, pref, setPref) =>{
    if (e==='l') {
        setPref({...pref, shortPants: false, longPants: true})
    }
    if (e==='s') {
        setPref({...pref, shortPants: true, longPants: false})
    }
}