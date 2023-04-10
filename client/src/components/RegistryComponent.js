import React, { useState } from 'react'
import {Form,FormGroup,Label,Input,Button,Alert} from 'reactstrap'


function RegistryComponent() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [resetPassword,setResetPassword] = useState('')
    const [alert,setAlert] = useState(true);

const registry = async(e)=>{
    e.preventDefault()
    setAlert(false);
    const response = await fetch('http://localhost:5000/registry',{
        method:'POST',
        body: JSON.stringify({username,password}),
        headers:{'Content-Type':'application/json'},
    });
    if(response.status ===200){
        setAlert(true)
    }else{
        setAlert(false)
    }
}

  return (
    <div className='container w-25 bg-light p-3 mt-5'>
        {!alert &&   <Alert color="danger">
                        Registry fail
                    </Alert>}
      <Form onSubmit={registry}>
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
        <FormGroup>
          <Label for="examplePassword">
            Reset Password
          </Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="password placeholder"
            type="password"
            value={resetPassword}
            onChange={e=>setResetPassword(e.target.value)}
          />
        </FormGroup>
        <Button>Registry</Button>
      </Form>
      
    </div>
  )
}

export default RegistryComponent
