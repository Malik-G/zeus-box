import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from './firebase'
import "./Login.css"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const signIn = x => {
    x.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then(auth => {
        if (auth) { history.push('./') }
      })
      .catch(error => {
        alert(error.message);
      })
  }

  const register = x => {
    x.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then(auth => {
        if (auth) { history.push('./') }
      })
      .catch(error => {
        alert(error.message);
      })
  }

  return (
    <>
      <img className="login-video" src="./pitbull5.jpg" alt="" />
      <div className="login" title="Home Page">
        <Link to="./">
          <img className="login-logo" src="./zeus-logo-2.png" alt=""></img>
        </Link>

        <div className="login-container">
          <h1 className="login-title">Welcome</h1>
          <form>
            <h5>Email</h5>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            <h5>Password</h5>
            <input type="password" value={password} onChange={p => setPassword(p.target.value)} />
            <button className="login-sign-in" onClick={signIn} type="submit">Sign In</button>
          </form>
          <p className="agreement">By signing in, you agree to the [fake] terms & conditions of Zeus Box.</p>
          <hr className="login-line-break" />
          <p className="or">or</p>
          <button className="login-register" onClick={register}>Create an Account</button>
        </div>
      </div>
    </>
  )
}

export default Login
