import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Signup() {

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  const [errors, setErrors] = useState(null)
  const {setUser, setToken} = useStateContext()

  const onSubmit = (ev) => {

    ev.preventDefault()

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(error => {
        const response = error.response
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Inscreva-se</h1>
          {
            errors && <div className="alert">
              {
                Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))
              }
            </div>
          }
          <input ref={nameRef} placeholder="Nome completo" />
          <input ref={emailRef} type="email" placeholder="E-mail" />
          <input ref={passwordRef} type="password" placeholder="Senha" />
          <input ref={passwordConfirmationRef} type="password" placeholder="Confirme a senha" />
          <button className="btn btn-block">Inscrever</button>
          <p className="message">
            Possui conta? <Link to="/login">Entrar</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
