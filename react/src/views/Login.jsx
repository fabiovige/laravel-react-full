import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Login() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const [errors, setErrors] = useState(null)
  const {setUser, setToken} = useStateContext()

  const onSubmit = (ev) => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    setErrors(null)
    axiosClient.post('/login', payload)
      .then(({data}) => {
        console.log(data)
        setUser(data.user)
        setToken(data.token)
      })
      .catch(error => {
        const response = error.response
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors)
          } else {
            setErrors({
              email: [response.data.message]
            })
          }
        }
      })

  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Entre na sua conta</h1>
          {
            errors && <div className="alert">
              {
                Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))
              }
            </div>
          }
          <input ref={emailRef} type="email" placeholder="E-mail" />
          <input ref={passwordRef} type="password" placeholder="Senha" />
          <button className="btn btn-block">Entrar</button>
          <p className="message">
            Não tem conta? <Link to="/signup">Increva-se</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
