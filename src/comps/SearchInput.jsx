import styles from './SearchInput.module.css'
import { InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { getWeather } from '../util/getWeather';
import { useState } from 'react';

const SearchInput = ({setWeather, cityList}) => {
  const [input, setInput] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const handleInput =(e) => {
    setInput(e.toLowerCase())
    if (e.length > 2) {
      setFilteredCities(cityList.filter(city => city.toLowerCase().startsWith(e)))
    }
  }
  const handleSrcWeather =(e)=>{
    getWeather(e.target.innerText, setWeather)
    setInput('')
  }
    return ( 
        <div className={styles.inputContainer}>
            <div className={styles.input}>
              <InputGroup>
                <Input type="text" htmlSize={24} width='auto' placeholder='Search city' _placeholder={{ color: 'inherit' }} value={input} onChange={(e) => handleInput(e.target.value)}/>
                <InputRightElement
                  children={<span className="material-icons-outlined" onClick={()=>setInput('')}>delete</span>}
                  >
                </InputRightElement>
              </InputGroup>
            </div>
            <div className={styles.dropdown} style={{display: input.length > 2 ? "block": "none"}}>
              {filteredCities.length >0 &&
                filteredCities.map((city, i) => 
                  <div key={i} onClick={e => handleSrcWeather(e)}>
                    {city}
                  </div>)}
            </div>
          </div>
     );
}
 
export default SearchInput;