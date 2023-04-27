import styles from './PrefCardAdmin.module.css'
import { PrefUpdate } from './PrefUpdate'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    useDisclosure
  } from '@chakra-ui/react'
export const PrefCardAdmin = ({pref, setPrefs}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return ( 
      <>
        <div className={styles.prefCard} onClick={onOpen}>
            <p>{pref.prefName}</p>
            <p>min: {pref.minTemp} C</p>
            <p>max: {pref.maxTemp} C</p>
        </div>
        <Modal isOpen={isOpen} size={'xl'} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <PrefUpdate {...{pref, setPrefs, onClose}}/>
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