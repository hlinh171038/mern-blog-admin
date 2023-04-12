import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { compareAsc, format } from 'date-fns'
import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'

function DetailComponent() {
    const [postId,setPostId] = useState(null)
    const {id} = useParams()
    useEffect(()=>{
        fetch(`http://localhost:5000/post/${id}`).then(response=>{
            response.json().then(post=>{
                setPostId(post)
            })
        })
    },[])
    
    if(!postId) return <div className='text-center text-secondary'>Loading....</div>;
    const {author,content,cover,createdAt,summary,title} = postId;
  return (
    <div className='container mt-3 bg-light'>
        <div className=''>
            <div className='text-uppercase text-center text-dark fs-1 text fw-bold mt-3 mb-3'>{title}</div>
            <div className='d-flex justify-content-center align-items-center'>
                <Link to={`/edit/${id}`}>Edit Blog</Link>
            </div>
            <div className='text-muted small d-flex justify-content-between '>
                <span className='me-3'><span className='me-1'>Author:</span>{author.username}</span>
                <span className=''>{format(new Date(createdAt), 'yyyy-MM-dd HH:mm')}</span>
            </div>
        </div>
        <div className='' style={{height:"500px","max-height":"500px"}}>
            <img src={`http://localhost:5000/`+cover} className='w-100 h-100'/>
        </div>
        <div className='mt-3'>
           
            <div className='text-dark'>
                <div>{summary}</div>
                <div dangerouslySetInnerHTML={{__html:content}}/>
            </div>
        </div>
        
    </div>
  )
}

export default DetailComponent
