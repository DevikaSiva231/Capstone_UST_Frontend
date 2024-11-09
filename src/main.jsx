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
import Searchrestaurent from './pages/searchrestaurent'
import Rough from './pages/rough'

const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {path:"/",element:<Home/>},
      {path:"/home",element:<Home/>},
      {path:"/signup",element:<Signup/>},
      {path:"/login",element:<Login/>},
      {path:"/about",element:<About/>},
      {path:"/registerbusiness",element:<Registerbusiness/>},
      {path:"/business",element:<Businesstemplate/>},
      {path:"/ownerprofile",element:<Ownerprofile/>},
      {path:"/userprofile",element:<Userprofile/>},
      {path:"/searchrestaurent",element:<Searchrestaurent/>},
      {path:"/rough",element:<Rough/>},
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
