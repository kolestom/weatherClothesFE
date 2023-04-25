import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './pages/RootLayout'
import Callback from './pages/Callback'
import Home from './pages/Home'
import { Admin } from './pages/Admin'
import { ChakraProvider } from '@chakra-ui/react'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        // path: 'login',
        index: true,
        element: <Home/>
      },
      {
        path: 'callback',
        element: <Callback/>
      },
      {
        path: 'admin',
        element: <Admin/>
      }
    ]
  }
])

function App() {
  

  return (
    <ChakraProvider>

      <RouterProvider router={router}/>
    </ChakraProvider>
  )
}

export default App