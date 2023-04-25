import axios from "axios";

export const client = axios.create({ baseURL: "http://localhost:3005" });

export const reqLogin = async(code) =>{
    try {
        const response = await client.post('/api/login', {code})     
        if (response.status !== 200) return null
        return response.data.token
    }catch (err) {
        console.log(err.message);
        return null
    }
}