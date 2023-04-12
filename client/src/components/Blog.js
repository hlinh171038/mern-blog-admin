import React from 'react'
import { compareAsc, format } from 'date-fns'
import  {Link} from 'react-router-dom'
function Blog({title,cover,createdAt,author,summary,_id}) {
    console.log(_id)
  return (
    <Link to={`/post/${_id}`} className='text-decoration-none'>
        <div className='container '>
        <div className='bg-light d-flex flex-direction-columns gap-3 mt-3 '>
            <div className='col-lg-4 p-1' style={{height:"250px", "max-height":"250px", "overflow":"hidden"}}>
                <img src={'http://localhost:5000/'+cover} className='w-100  h-100'/>
            </div>
            <div className='col-lg-8'>
                <h2 className='text-capitalize text-dark text-dark '>{title}</h2>
                <div className='d-flex small mt-3'>
                    <div className='text-secondary me-5 text-capitalize small'>{author.username}</div>
                    <div className='text-secondary small'>{format(new Date(createdAt), 'yyyy-MM-dd HH:mm')}</div>
                </div>
                <div className='content text-muted  mt-3' >{summary}</div>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default Blog
