import {FcGoogle} from 'react-icons/fc'
import { Button } from '@chakra-ui/react';
import { fullUrl } from '../config';
import { $user, logout } from '../states/user';
import useRXjs from '../hooks/useRXjs';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
    const navigate = useNavigate()
    const user = useRXjs($user)

    const handleLogin = () => {
        window.location.href = fullUrl;
      }

    const handleLogout = () => {
        logout()
        navigate('/')
    }
    return ( 
        <nav>
            {user && <h1>{user.name}</h1>}
            <Button onClick={()=>navigate('admin')} colorScheme='blue'>Admin</Button>
            <Button onClick={()=>navigate('/')}colorScheme='red'>Home</Button>
            <div>
                {user ?
                <Button onClick={handleLogout} colorScheme="blue" variant="solid">Logout</Button> :
                <Button leftIcon={<FcGoogle/>} onClick={handleLogin} colorScheme="gray" variant="solid" >Login</Button>}
            </div>
            
        </nav>
     );
}