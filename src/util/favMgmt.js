import { client } from "../api/own"

export const saveCity = async(location) =>{
    try {
        const resp = await client.post(`/api/favCity`,{
            city: location.name,
            country: location.country,
            lat: location.lat,
            lon: location.lon
        },
        { headers: {Authorization: `Bearer: ${localStorage.getItem('token')}`}})
        return resp.data
    } catch (error) {
        alert(error.response.data)
    }
}
export const delCity = async(id) =>{
    try {
        const resp = await client.delete(`/api/favCity/${id}`,
        { headers: {Authorization: `Bearer: ${localStorage.getItem('token')}`}})
        return resp.data
    } catch (error) {
        alert(error.response.data)
    }
}