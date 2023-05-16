import { PrefCard } from './PrefCard';
import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalBody
  } from '@chakra-ui/react'

const PrefSuggestion = ({isOpen ,onClose, temp}) => {
    
    return ( 
        <Modal isOpen={isOpen} size={'md'} onClose={onClose}>
            <ModalContent>
                <ModalBody>
                    <PrefCard temp={temp}/>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
     );
}
 
export default PrefSuggestion;