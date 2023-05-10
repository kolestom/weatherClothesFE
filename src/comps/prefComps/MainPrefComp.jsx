import Head from './Head';
import UpperBody from './UpperBody';
import Legs from './Legs';
import Temps from './Temps';
import { Input } from '@chakra-ui/react';

const MainPrefComp = ({pref, setPref}) => {
    return ( 
        <>
            <Input width={"70%"} size='sm' placeholder='Preference name' value={pref.prefName} onChange={(e) => setPref({...pref, prefName: e.target.value})}/>
            <Temps {...{pref, setPref}}/>
            <Head {...{pref, setPref}}/>
            <UpperBody {...{pref, setPref}}/>
            <Legs {...{pref, setPref}}/>
            <Input width={"70%"} placeholder='Notes' value={pref.notes} onChange={(e) => setPref({...pref, notes: e.target.value})}/>
        </>
     );
}
 
export default MainPrefComp;