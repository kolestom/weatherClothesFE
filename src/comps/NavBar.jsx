import {FcGoogle} from 'react-icons/fc'
import { fullUrl } from '../config';
import { $user, logout } from '../states/user';
import useRXjs from '../hooks/useRXjs';
import { useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css'
import {
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useToast,
    useDisclosure
  } from '@chakra-ui/react'
import ProfileDelete from './ProfileDelete';

export const NavBar = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const user = useRXjs($user)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleLogin = () => {
        window.location.href = fullUrl;
    }
    
    const handleLogout = () => {
        logout()
        navigate('/')
        toast({
            title: 'Logout successful.',
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
    }

    
    return ( 
        <nav>
            <div className={styles.logoContainer}>
                <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_sabv8ipv.json" mode="bounce" background="transparent"  speed="2"  style={{width: "80px"}}  loop autoplay></lottie-player>
            </div>
            {user && <h1 className={styles.greet}>Hi, {(user.name.split(' '))[1]}!</h1>}
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
                    <MenuItem onClick={onOpen} >Delete profile</MenuItem>
                </MenuList>
            </Menu>:
            <Button leftIcon={<FcGoogle/>} onClick={handleLogin} colorScheme="gray" variant="solid" >Login</Button>}
            <ProfileDelete {...{ isOpen, onClose }}/>
        </nav>
     );
}