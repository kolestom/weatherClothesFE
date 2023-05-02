import {FcGoogle} from 'react-icons/fc'
import { Button } from '@chakra-ui/react';
import { fullUrl } from '../config';
import { $user, logout } from '../states/user';
import useRXjs from '../hooks/useRXjs';
import { useNavigate } from 'react-router-dom';
import { client } from '../api/own';

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

    const handleDelete = async() =>{
        const conf = confirm('Are you sure you want delete your profile?')
        if (conf) {
            try {
                const resp = await client.delete('/api/delUser',{
                    headers: { Authorization: `Bearer: ${localStorage.getItem('token')}`}
                })
                logout()
                navigate('/')
            } catch (error) {
                alert(error.response.message)
            }
        }
    }
    return ( 
        <nav>
            {user && <h1>{user.name}</h1>}
            {user && <Button onClick={()=>navigate('admin')} colorScheme='purple'>Admin</Button>}
            {user && <Button onClick={()=>navigate('/')}colorScheme='yellow'>Home</Button>}
            {user && <Button onClick={handleDelete}colorScheme='red'>Delete profile</Button>}
            <div>
                {user ?
                <Button onClick={handleLogout} colorScheme="blue" variant="solid">Logout</Button> :
                <Button leftIcon={<FcGoogle/>} onClick={handleLogin} colorScheme="gray" variant="solid" >Login</Button>}
            </div>
            
        </nav>
     );
}