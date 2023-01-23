import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [ credentials, setCredentials ] =  useState({
    email: "",
    password: ""
  })

  let history  = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login" , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4NDQwMDVmNDg1OGM1NGZhM2I2OGVhIn0sImlhdCI6MTY2OTczMzMzNn0.etsS57gge1q8Y0xiIJ3qv3dsIIFKOi18-lJQWYfK1Ps"
          },
          body: JSON.stringify({ email: credentials.email , password: credentials.password })
        });
        const json = await response.json()  
        console.log(json)
        if(json.success){
          // save the auth token and redirect
          localStorage.setItem('token', json.authToken)
          props.showAlert("Logged In Successfully", "success")
          history("/")
      }else{
        props.showAlert("Invalid Credentials", "danger")
      }
    }

    const onChange = (e) =>  {
      setCredentials({ ...credentials, [e.target.name]: e.target.value } )
  }

  return (
    <div className='mt-3'>
    <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={credentials.email} name='email' aria-describedby="emailHelp" onChange={onChange} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3"> 
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"  id="password" value={credentials.password} name='password'  onChange={onChange} />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
