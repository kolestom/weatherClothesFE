import { client } from "../api/own"

export const getWeather = async(e) =>{
    if (e) {
      const [city, country] = e.split(', ')
      const apiResponse = await client.post(`/api/weather`, {
        city,
        country,
      })
      return apiResponse.data
    }
  }