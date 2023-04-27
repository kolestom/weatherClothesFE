import { BehaviorSubject } from "rxjs";
import jwtDecode from "jwt-decode";
import { reqLogin } from "../api/own";


export const $user = new BehaviorSubject(null)

export const login = async (code) => {
    const token = await reqLogin(code)
    if (!token) throw "Error, no token received"
    try {
        const decodedToken = jwtDecode(token)
        $user.next(decodedToken)
        localStorage.setItem("token", token)
    } catch (error) {
        console.log(error.message);
        return null
    }
}
export const logout = () => {
    localStorage.removeItem("token")
    $user.next(null)
}

export const setUser = (value) =>{
    $user.next(value)
}