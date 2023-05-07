import { client } from "../api/own"

export const getWeather = async(e, setWeather, setSelectedOption, setInput) =>{
    if (e.target.value) {
      const [city, country] = e.target.value.split(', ')
      const apiResponse = await client.post(`/api/weather`, {
        city,
        country,
      })
      setWeather(apiResponse.data)
      setSelectedOption('');
      setInput('')
    }
  }