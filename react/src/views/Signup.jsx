import {Link} from "react-router-dom";

export default function Signup() {

  const onSubmit = (ev) => {
    ev.preventDefault()
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Inscreva-se</h1>
          <input type="text" placeholder="Nome completo" />
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <input type="password" placeholder="Confirme a senha" />
          <button className="btn btn-block">Inscrever</button>
          <p className="message">
            Possui conta? <Link to="/login">Entrar</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
