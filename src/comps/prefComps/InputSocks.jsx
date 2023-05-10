import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";

const InputSocks = ({pref, setPref}) => {
    return ( 
        <NumberInput
            size='xs'
            maxW={16}
            defaultValue={pref.warmSocks ? pref.warmSocks : 0}
            min={0} max={9}
            onChange={e => setPref({...pref, warmSocks: parseInt(e)})}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
     );
}
 
export default InputSocks;