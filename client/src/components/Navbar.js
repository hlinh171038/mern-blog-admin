import React from 'react'
import {Link} from 'react-router-dom'
function Navbar() {
  return (
    <div className='w-100 bg-secondary'>
        <div className='row w-100 p-3 bg-secondary'>
            <div className='col-4 text-light  d-flex align-items-center justify-content-center' >
                <Link to="/" className='text-decoration-none text-light'>Logo</Link>
            </div>
                <div className='col-7 d-flex align-items-center justify-content-center text-light' style={{listStyleType:'none'}}>
                    <li  className='pe-3'><Link to="/" className='text-decoration-none text-light'>Home</Link></li>
                    <li className='pe-3'><Link to="/create-post" className='text-decoration-none text-light'>create post</Link></li>
                    <li className='pe-3'><Link to="/login" className='text-decoration-none text-light'>login</Link></li>
                    <li className='pe-3'><Link to="/registry" className='text-decoration-none text-light'>Registry</Link></li>
                </div>
        </div>
    </div>
  )
}

export default Navbar

