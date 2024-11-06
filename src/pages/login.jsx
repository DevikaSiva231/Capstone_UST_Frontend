import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Login() {
    const navigate=useNavigate()
    const n = () =>{
        navigate("/")
    }
  return (
    <div>
        {/* <div>
            <div className="mt-5 mb-0 text-center">
                    <h1 className="text-3xl font-bold">Login now!</h1>
                </div>
            <div className="hero bg-base-0 min-h-screen">
                
                <div className="card glass w-96">
                    <form className="card-body">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input type="text" placeholder="username" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div> */}
                        {/* {errormsg &&<div className="ml-24 error">{errormsg}</div>} */}
                        {/* <div className="form-control mt-4">
                        <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <label className="ml-28 label">
                            <span className="label-text">Dont have an account ?</span>
                    </label>
                    <button className="ml-7 mr-7 mb-5 btn btn-primary">Sign Up</button>
                    <a onClick={n} className="text-center">Login later?</a>
                </div>
            </div>
        </div> */}

        <div className="hero glass min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now</h1>
            <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            </div>
            <div className="m-10 card glass w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                </div>
                <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login