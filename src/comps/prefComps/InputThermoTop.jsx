import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";

const InputThermoTop = ({pref, setPref}) => {
    return ( 
        <NumberInput
            size='xs'
            maxW={16}
            defaultValue={pref.thermoTop ? pref.thermoTop : 0}
            min={0} max={9}
            onChange={e => setPref({...pref, thermoTop: parseInt(e)})}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
     );
}
 
export default InputThermoTop;