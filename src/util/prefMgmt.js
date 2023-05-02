import axios from "axios";

export const prefMgmt = async (
  prefName,
  userSub,
  minTemp,
  maxTemp,
  cap,
  scarf,
  jacket,
  thermoTop,
  shortGloves,
  longGloves,
  thermoGloves,
  shortPants,
  longPants,
  thermoLeggins,
  warmSocks,
  notes,
  id
) => {
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
        prefName,
      userSub,
      minTemp,
      maxTemp,
      clothes: {
          cap,
          scarf,
          jacket,
          thermoTop,
          gloves: {
              short: shortGloves,
              long: longGloves,
              thermo: thermoGloves
          },
          pants: {
              shorts: shortPants,
              longs: longPants
          },
          thermoLeggins,
          warmSocks
      },
      notes
    }
})
  return response;
};

