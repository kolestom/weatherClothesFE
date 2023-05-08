import { client } from "../api/own"

export const getWeather = async(e, setWeather, setSelectedOption, setInput) =>{
    if (e) {
      const [city, country] = e.split(', ')
      const apiResponse = await client.post(`/api/weather`, {
        city,
        country,
      })
      setWeather(apiResponse.data)
      setSelectedOption('');
      setInput('')
    }
  }