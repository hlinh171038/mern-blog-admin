import React,{useEffect, useState} from 'react'
import {Form,FormGroup,Label,Input,Button,Alert} from 'reactstrap'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate,useParams} from "react-router-dom";

function CreateComponent() {
    const [value, setValue] = useState('');
    const [title,setTitle] = useState('')
    const [summary,setSummary] = useState('')
    const [files,setFiles] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()
    const edit =async(e)=>{
        e.preventDefault()
        const data = new FormData()
        data.set("title",title)
        data.set('summary',summary)
        data.set('file',files?.[0])
        data.set('content',value)
        data.set('id',id)
       const response = await fetch('http://localhost:5000/post',{
            method:"PUT",
            body:data,
            credentials:"include"
        })
        if(response.ok){
            navigate('/')
        }
    }
    useEffect(()=>{
        fetch('http://localhost:5000/post/'+id).then(response =>{
            response.json().then(post =>{
                setTitle(post.title)
                setSummary(post.summary)
                setFiles(post.cover)
                setValue(post.content)
            })
        })
    },[])
  return (
    <div className='bg-light container p-3 w-50 mt-5'>
        <Form onSubmit={edit}>
            <FormGroup>
                <Input
                placeholder="Title"
                type="text"
                value={title}
                onChange={e=>setTitle(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Input
                placeholder="Summary"
                type="text"
                value={summary}
                onChange={e=>setSummary(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Input
                name="file"
                placeholder="file"
                type="file"
                onChange={e=>setFiles(e.target.files)}
                />
            </FormGroup>
            <ReactQuill theme="snow"
                        value={value} 
                        onChange={setValue} 
                        className='mt-3 mb-3 ' />
            <FormGroup>
                <Input
                type="submit"
                value="Edit Post"
                className='text-light bg-secondary'
                />
            </FormGroup>
        </Form>
      
    </div>
  )
}

export default CreateComponent
