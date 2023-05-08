import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";

const InputNumber = ({value, setValue}) => {
    return ( 
        <NumberInput size='xs' maxW={16} defaultValue={value ? value : 0} min={0} max={9} onChange={(e) => setValue(parseInt(e))}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
     );
}
 
export default InputNumber;