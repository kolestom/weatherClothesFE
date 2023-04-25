import {FcGoogle} from 'react-icons/fc'
import { Button } from '@chakra-ui/react';
import { fullUrl } from '../config';
import { $user, logout } from '../states/user';
import useRXjs from '../hooks/useRXjs';

export const NavBar = () => {

    const user = useRXjs($user)

    const handleLogin = () => {
        window.location.href = fullUrl;
      }
    return ( 
        <nav>
            <h1>This is the navbar</h1>
            {user && <h1>{user.name}</h1>}
            <div>
                {user ?
                <Button onClick={logout} colorScheme="blue" variant="solid">Logout</Button> :
                <Button leftIcon={<FcGoogle/>} onClick={handleLogin} colorScheme="gray" variant="solid" >Login</Button>}
            </div>
            
        </nav>
     );
}