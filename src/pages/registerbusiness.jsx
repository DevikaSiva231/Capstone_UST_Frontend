import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Registerbusiness() {

    const [bname,setBname]=useState('')
    const [owner,setOwner]=useState('')
    const [address,setAddress]=useState('')
    const [zipcode,setZipcode]=useState(0)
    const [phone,setPhone]=useState('')
    const [email,setEmail]=useState('')
    const [website,setWebsite]=useState(null)
    const [description,setDescription]=useState('')
    const [category,setCategory]=useState('')
    const [image,setImage]=useState('')
    const [worktime,setWorktime]=useState({})

    const navigate=useNavigate()
    const n = () =>{
        navigate("/")
    }

    const details={
        b_name:bname,
        owner:owner,
        address:address,
        zipcode:zipcode,
        phone:phone,
        email:email,
        website:website,
        description:description,
        category:category,
        image:image,
        work_time:worktime,

    }

    const handleSubmit = async (e) => {
        {console.log('error')}
          e.preventDefault();
          try {
              const response = await axios.post('http://127.0.0.1:8000/api/businesses/', details);
              console.log('Form submitted successfully:', response.data);
              navigate('/home')
          } catch (error) {
              console.error('Error submitting form:', error);
          }
      };


  return (
    <div>
        <div>
            <div className="mt-5 mb-0 text-center">
                <h1 className="text-3xl font-bold text-white">Register Your Business</h1>
            </div>
            <br/>
        <div className="hero bg-base-0 min-h-screen mb-5">  
            <div className="card glass w-96">
                <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Business Name </span>
                    </label>
                    <input type="text" value={bname} onChange={(e)=>setBname(e.target.value)} placeholder="username" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Owner</span>
                    </label>
                    <input type="text" value={owner} onChange={(e)=>setOwner(e.target.value)} placeholder="username" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email </span>
                    </label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="username" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone </span>
                    </label>
                    <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="username" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Zipcode</span>
                    </label>
                    <input type="text" value={zipcode} onChange={(e)=>setZipcode(e.target.value)} placeholder="username" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label"><span className="label-text">Description</span></label>
                        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="textarea textarea-success textarea-bordered mb-2" cols="50" rows="5" placeholder="Message" ></textarea>
                    </div>
                    {/* {errormsg &&<div className="ml-24 error">{errormsg}</div>} */}
                    <div className="form-control mt-4">
                    <button type="submit" className="btn btn-primary">Create Business</button>
                    </div>
                </form>
                <a onClick={n} className="text-center">Register  later?</a>
                <br/>
            </div>
        </div>
     </div>
   </div>
  )
}

export default Registerbusiness