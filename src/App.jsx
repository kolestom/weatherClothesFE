import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './pages/RootLayout'
import CallbackPage from './pages/CallbackPage'
import LoginPage from './pages/LoginPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        // path: 'login',
        index: true,
        element: <LoginPage/>
      },
      {
        path: 'callback',
        element: <CallbackPage/>
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