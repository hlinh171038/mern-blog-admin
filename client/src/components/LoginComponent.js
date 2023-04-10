import React,{useState} from 'react'
import {Form,FormGroup,Label,Input,Button,Alert} from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../useContext'

function LoginComponent() {
  const {setUserInfo} = useGlobalContext()
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [alert,setAlert] = useState(true)
  const navigate = useNavigate()

const login = async(e)=>{
  e.preventDefault()
  const response = await fetch('http://localhost:5000/login',{
    method:"POST",
    body:JSON.stringify({username,password}),
    headers:{'Content-Type':'application/json'},
    credentials:"include"
  })
  if(response.ok){
    response.json().then(userInfo=>{
      setUserInfo(userInfo);
      navigate('/')
    })
  }else{
    setAlert(false)
  }
}

  return (
    <div className='container w-25 bg-light p-3 mt-5'>
      {!alert &&  <Alert color="danger">
                    Email or password is wrong
                  </Alert>}
      <Form onSubmit={login}>
        <FormGroup>
          <Label for="exampleEmail">
            Email
          </Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="with a placeholder"
            type="email"
            value={username}
            onChange={e=>setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">
            Password
          </Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="password placeholder"
            type="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
        </FormGroup>
        <Button>Login</Button>
      </Form>
      
    </div>
  )
}

export default LoginComponent
