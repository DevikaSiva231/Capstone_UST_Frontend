import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './layout'
import Home from './pages/home'
import Login from './pages/login'
import Registerbusiness from './components/homePage/registerbusiness'
import Businesstemplate from './pages/businesstemplate'
import About from './pages/about'
import Ownerprofile from './pages/ownerprofile'
import Signup from './pages/signup'
import Searchrestaurent from './pages/searchrestaurent'
import Rough from './pages/rough'
import { Provider } from 'react-redux'
import store from './redux/store'
import Dashboard from './components/DashBoardUsers/dashboard'
import RegisterBusiness from './components/homePage/registerbusiness'
import BusinessFormPage from './components/homePage/BusinessFormPage'
import EventForm from './components/DashBoardUsers/EventHandler/eventForm'

const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {path:"/",element:<Home/>},
      {path:"/home",element:<Home/>},
      {path:"/signup",element:<Signup/>},
      {path:"/login",element:<Login/>},
      {path:"/business",element:<Businesstemplate/>},
      {path:"/ownerprofile",element:<Ownerprofile/>},
      {path:"/searchrestaurent",element:<Searchrestaurent/>},
      {path:"/userDashboard",element:<Dashboard/>},
      {path:"/registerBusiness",element:<BusinessFormPage/>},
      {path:"//events/create/:businessId",element:<EventForm/>},
      {path:"/rough",element:<Rough/>},
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
