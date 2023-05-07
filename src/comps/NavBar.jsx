import {FcGoogle} from 'react-icons/fc'
import { Button } from '@chakra-ui/react';
import { fullUrl } from '../config';
import { $user, logout } from '../states/user';
import useRXjs from '../hooks/useRXjs';
import { useNavigate } from 'react-router-dom';
import { client } from '../api/own';
import styles from './NavBar.module.css'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider
  } from '@chakra-ui/react'

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

    const profileDelete = async() =>{
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
            <div className={styles.logoContainer}>
                <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_sabv8ipv.json" mode="bounce" background="transparent"  speed="2"  style={{width: "80px"}}  loop autoplay></lottie-player>
            </div>
            {/* <div>Icons made by <a href="https://www.flaticon.com/authors/ultimatearm" title="ultimatearm">ultimatearm</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/victoruler" title="Victoruler">Victoruler</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/slidicon" title="Slidicon">Slidicon</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
            {user && <h1>Hi, {user.name}!</h1>}
            {user ? <Menu>
                <MenuButton
                    px={4}
                    py={2}
                    transition='all 0.2s'
                    borderRadius='md'
                    borderWidth='1px'
                    _hover={{ bg: 'gray.400' }}
                    _expanded={{ bg: 'blue.400' }}
                    _focus={{ boxShadow: 'outline' }}
                >
                    Menu
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={()=>navigate('admin')}>Manage preferences</MenuItem>
                    <MenuItem onClick={()=>navigate('/')}>Home page</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={profileDelete} >Delete profile</MenuItem>
                </MenuList>
            </Menu>:
            <Button leftIcon={<FcGoogle/>} onClick={handleLogin} colorScheme="gray" variant="solid" >Login</Button>}
        </nav>
     );
}