import React, { useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../useContext'
import Blog from './Blog'
function Blogs() {
    const {userInfo} = useGlobalContext()
    const [posts,setPosts] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{
        fetch('http://localhost:5000/post').then(response=>{
            response.json().then(posts=>{
                setPosts(posts)
            })
        })
    },[])
    if(!userInfo){
        navigate('/login')
    }
    else{
  return (
    <div >
        <h2 className='text-center mt-5 mb-5'>BLOGS</h2>
       {posts.map(item=>{
        return <Blog {...item}/>
       })}
    </div>
  )
}
}

export default Blogs
