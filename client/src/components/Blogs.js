import React from 'react'

function Blogs() {
  return (
    <div className='container'>
        <div className='bg-light d-flex flex-direction-columns gap-3 mt-3 '>
            <div className='col-lg-4'>
                <img src="https://cdn.pixabay.com/photo/2023/03/22/20/16/muffin-7870491_640.jpg" className='w-100 m-1'/>
            </div>
            <div className='col-lg-8'>
                <h2 className='text-transform-uppercase text-dark'>Tiep buoc truyen nhan</h2>
                <div className='d-flex small'>
                    <div className='text-secondary me-3'>times:</div>
                    <div className='text-secondary'>21-10-2022 14:23</div>
                </div>
                <div className='content text-muted  ' >this is content, lorem is me</div>
            </div>
        </div>
    </div>
  )
}

export default Blogs
