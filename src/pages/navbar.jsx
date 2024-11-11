import React from 'react'
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import ProfileDropdown from '../components/homePage/ProfileDropDown';
import RegisterBusiness from '../components/homePage/registerbusiness';
import SearchComponent from '../components/UserLocation/searchComponent';

function Navbar() {
    const navigate= useNavigate()

    const n = ()=>{
        navigate('/ownerprofile')
    }
  return (
    <div>
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li><a>Home</a></li>
                    <li><a>About Us</a></li>
                </ul>
                </div>
                <a onClick={()=>navigate('/')} className="btn btn-ghost text-xl">Around Town</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="/" className="justify-between">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="justify-between">About Us</Link>
                    </li>
                </ul>
            </div>
                <div className="flex-none gap-2 navbar-end relative">
                    <div className="flex-shrink-0">
                        <RegisterBusiness />
                    </div>
                    <div className="form-control absolute z-2 top-0 right-96">
                        <SearchComponent/>
                    </div>
                    < ProfileDropdown />
            </div>
        </div>
    </div>
  )
}
export default Navbar