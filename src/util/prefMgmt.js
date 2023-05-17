import axios from "axios";

export const prefMgmt = async ( pref, userSub, id ) => {
    let path
    let method
  if (id) {
    path = `/api/pref/${id}`;
    method = 'put'
  } else {
    path = `/api/pref`;
    method = 'post'
  }
  const response = axios.request({
    method,
    url: `http://localhost:3005${path}`,
    headers: {
        Authorization: `Bearer: ${localStorage.getItem('token')}`
    },
    data: {
      prefName: pref.prefName,
      userSub,
      minTemp: pref.minTemp,
      maxTemp: pref.maxTemp,
      clothes: {
          cap: pref.cap,
          scarf: pref.scarf,
          jacket: pref.jacket,
          thermoTop: pref.thermoTop,
          gloves: {
              short: pref.shortGloves,
              long: pref.longGloves,
              thermo: pref.thermoGloves
          },
          pants: {
              shorts: pref.shortPants,
              longs: pref.longPants
          },
          thermoLeggins: pref.thermoLeggins,
          warmSocks: pref.warmSocks
      },
      notes: pref.notes
    }
  })
  return response;
};

