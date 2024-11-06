import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Registerbusiness() {

    const navigate=useNavigate()
    const n = () =>{
        navigate("/")
    }
  return (
    <div>
        <div>
            <div className="mt-5 mb-0 text-center">
                <h1 className="text-3xl font-bold text-white">Register Your Business</h1>
            </div>
            <br/>
        <div className="hero bg-base-0 min-h-screen mb-5">  
            <div className="card glass w-96">
                <form className="card-body">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Business Name </span>
                    </label>
                    <input type="text" placeholder="username" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Owner</span>
                    </label>
                    <input type="email" placeholder="username" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email </span>
                    </label>
                    <input type="email" placeholder="username" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone </span>
                    </label>
                    <input type="number" placeholder="username" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Zipcode</span>
                    </label>
                    <input type="text" placeholder="username" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label"><span className="label-text">Description</span></label>
                        <textarea className="textarea textarea-success textarea-bordered mb-2" cols="50" rows="5" placeholder="Message" ></textarea>
                    </div>
                    {/* {errormsg &&<div className="ml-24 error">{errormsg}</div>} */}
                    <div className="form-control mt-4">
                    <button type="submit" className="btn btn-primary">Create Business</button>
                    </div>
                </form>
                {/* <button className="ml-7 mr-7 mb-5 btn btn-primary">Create Business</button> */}
                <a onClick={n} className="text-center">Register  later?</a>
                <br/>
            </div>
        </div>
     </div>
   </div>
  )
}

export default Registerbusiness