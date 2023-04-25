import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './pages/RootLayout'
import Callback from './pages/Callback'
import Home from './pages/Home'
import { Admin } from './pages/Admin'

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
    <RouterProvider router={router}/>
  )
}

export default App