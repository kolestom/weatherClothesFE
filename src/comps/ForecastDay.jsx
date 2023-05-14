import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
  } from '@chakra-ui/react'
import styles from './ForecastDay.module.css'
import PrefSuggestion from './PrefSuggestion'

const ForecastDay = ({day}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <div className={styles.day}>
                <p onClick={onOpen}>{day.date}</p>
            </div>
            <Drawer placement='bottom' size='xl' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
                    <DrawerBody>
                        <p>{day.day.avgtemp_c}</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <PrefSuggestion/>
        </>
     );
}
 
export default ForecastDay;