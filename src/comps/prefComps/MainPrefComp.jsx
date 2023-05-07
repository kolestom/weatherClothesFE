import Head from './Head';
import UpperBody from './UpperBody';
import Legs from './Legs';
import Temps from './Temps';
import { Input } from '@chakra-ui/react';

const MainPrefComp = ({prefName, setPrefName, minTemp, setMinTemp, maxTemp, setMaxTemp,cap, setCap, scarf, setScarf,
    jacket, setJacket, thermoTop, setThermoTop, shortGloves, setShortGloves, longGloves, setLongGloves, setThermoGloves,
    shortPants, setShortPants, setLongPants, thermoLeggins, setThermoLeggins, warmSocks, setWarmSocks, notes, setNotes
    }) => {
    return ( 
        <>
            <Input width={"70%"} size='sm' placeholder='Preference name' value={prefName} onChange={(e) => setPrefName(e.target.value)}/>
            <Temps {...{minTemp, setMinTemp, maxTemp, setMaxTemp}}/>
            <Head {...{cap, setCap, scarf, setScarf}}/>
            <UpperBody {...{jacket, setJacket, thermoTop, setThermoTop, shortGloves, setShortGloves, longGloves, setLongGloves, setThermoGloves}}/>
            <Legs {...{shortPants, setShortPants, setLongPants, thermoLeggins, setThermoLeggins, warmSocks, setWarmSocks}}/>
            <Input width={"70%"} placeholder='Notes' value={notes} onChange={(e) => setNotes(e.target.value)}/>
        </>
     );
}
 
export default MainPrefComp;