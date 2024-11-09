import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

function Searchrestaurent() {
  const [restaurent, setrestaurent] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/users/')
        .then(response => {setrestaurent(response.data);console.log(response.data)})
        .catch(error => {console.error('Error fetching details:', error)})
    }, []);

  return (
    <div>Restaurent

    <div class="m-8 ml-14 grid grid-cols-2 gap-8">
                {restaurent.map((con, index) => (
                  <div key={index}>
                    <p>{con.id}: {con.username}</p>
                    <hr/>
                    </div>))
                }
            </div>
                    
    </div>
  )
}

export default Searchrestaurent
