import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './layout'
import Home from './pages/home'
import Login from './pages/login'
import Registerbusiness from './pages/registerbusiness'
import Businesstemplate from './pages/businesstemplate'
import About from './pages/about'
import Ownerprofile from './pages/ownerprofile'
import Signup from './pages/signup'
import Userprofile from './pages/userprofile'

const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {path:"/",element:<Home/>},
      {path:"/signup",element:<Signup/>},
      {path:"/login",element:<Login/>},
      {path:"/about",element:<About/>},
      {path:"/registerbusiness",element:<Registerbusiness/>},
      {path:"/business",element:<Businesstemplate/>},
      {path:"/ownerprofile",element:<Ownerprofile/>},
      {path:"/userprofile",element:<Userprofile/>},
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
