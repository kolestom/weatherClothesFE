import styles from '../pages/Home.module.css'
import { InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { getWeather } from '../util/getWeather';

const SearchInput = ({input, handleInput, setInput, filteredCities, setWeather, setSelectedOption}) => {
    return ( 
        <div className={styles.inputContainer}>
            <div className={styles.input}>
              <InputGroup>
                <Input type="text" placeholder='Search city' _placeholder={{ color: 'inherit' }} value={input} onChange={(e) => handleInput(e.target.value)}/>
                <InputRightElement
                  children={<span className="material-icons-outlined" onClick={()=>setInput('')}>delete</span>}
                  >
                </InputRightElement>
              </InputGroup>
            </div>
            <div className={styles.dropdown} style={{display: input.length > 2 ? "block": "none"}}>
              {filteredCities.length &&
                filteredCities.map((city, i) => 
                  <option key={i} value={city} onClick={(e)=> getWeather(e, setWeather, setSelectedOption, setInput)}>
                    {city}
                  </option>)}
            </div>
          </div>
     );
}
 
export default SearchInput;