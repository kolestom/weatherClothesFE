import { useState } from 'react';
import useRXjs from '../hooks/useRXjs';
import { useNavigate } from 'react-router-dom';
import { $user, logout } from '../states/user';
import { client } from '../api/own';
import {
    Button,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

const ProfileDelete = ({isOpen, onClose }) => {
    const navigate = useNavigate()
    const user = useRXjs($user)
    const [input, setInput] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);


    const handleClose = () => {
        setInput('')
        setIsDisabled(true)
        onClose()
    }

    const checkInput = (e) =>{
        setInput(e.target.value)
        e.target.value === user.name ? setIsDisabled(false) : setIsDisabled(true)
    }

    const handleDelete = async() =>{
        try {
            const resp = await client.delete('/api/delUser',{
                headers: { Authorization: `Bearer: ${localStorage.getItem('token')}`}
            })
            logout()
            handleClose()
            navigate('/')
        } catch (error) {
            alert(error.response.message)
        }
    }

    return ( 
        <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Profile deletion</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <h1>This deletes all preferences and favorites linked to your user id.</h1>
                    <p>Please type your name used in your Google account to confirm deletion</p>
                    <Input type='text' value={input} onInput={e => checkInput(e)}></Input>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='red' isDisabled={isDisabled} onClick={handleDelete} >Delete profile</Button>
                    <Button colorScheme='blue' mr={3} onClick={handleClose}>
                    Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
     );
}
 
export default ProfileDelete;