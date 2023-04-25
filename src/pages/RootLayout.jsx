import {Outlet} from 'react-router-dom'
import { NavBar } from '../comps/NavBar';
const RootLayout = () => {
    return ( 
        <>
            <NavBar/>
            <Outlet/>
        </>
     );
}
 
export default RootLayout;