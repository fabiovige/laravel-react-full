import {Link} from "react-router-dom";

export default function Login() {

  const onSubmit = (ev) => {
    ev.preventDefault()
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Entre na sua conta</h1>
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <button className="btn btn-block">Entrar</button>
          <p className="message">
            Não tem conta? <Link to="/signup">Increva-se</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
