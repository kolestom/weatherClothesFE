import styles from './PrefCardAdmin.module.css'
import { PrefUpdate } from './PrefUpdate'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody
  } from '@chakra-ui/react'

export const PrefCardAdmin = ({selectedPref, setPrefs, isOpen, onClose}) => {
    

    return ( 
      <>
        <Modal isOpen={isOpen} size={'xl'} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <PrefUpdate {...{selectedPref, setPrefs, onClose}}/>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
      </>
     );
}