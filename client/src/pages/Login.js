import React from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillEnvelopeFill, BsFillLockFill, BsPersonFill } from 'react-icons/bs';
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';

const Login = () => {
  return (
    <div className="pagina-login">
      {/* Folhas laterais */}
      <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />
      <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />

      {/* Header */}
      <header className="header">
        <div className="header-top">
          <img src={logo} alt="Logo" className="logo" />
          <div className="header-right">
            <button className="toggle-theme">🌞</button>
            <button className="btn-entrar">Entrar</button>
          </div>
        </div>
      </header>

      {/* Nav bar */}
      <div className="nav-bar">
  <div className="nav-metade-esquerda">
    <span className="nav-link">Início</span>
  </div>
  <div className="nav-metade-direita">
    <span className="nav-link">Testes</span>
  </div>
</div>

      {/* Conteúdo Central */}
      <main className="login-container">
        <div className="login-box-wrapper">
          <div className="login-box">
            {/* Login */}
            <div className="login-section">
              <h2 className="login-title">Bem-vindo de volta!</h2>
              <div className="login-form-box">
                <div className="form-group">
                  <BsFillEnvelopeFill className="icon" />
                  <input type="email" placeholder="E-mail" />
                </div>
                <div className="form-group">
                  <BsFillLockFill className="icon" />
                  <input type="password" placeholder="Senha" />
                </div>
                <a href="#" className="forgot-password">Esqueci minha senha</a>
                <button className="btn-login">Login</button>
              </div>
            </div>

            {/* Cadastro */}
            <div className="register-section">
              <div className="cadastre-header">
                <h2 className="cadastre-se-titulo">Cadastre-se</h2>
              </div>
              <div className="register-fields">
                <div className="form-group">
                  <BsPersonFill className="icon" />
                  <input type="text" placeholder="Nome completo" />
                </div>
                <div className="form-group">
                  <BsFillEnvelopeFill className="icon" />
                  <input type="email" placeholder="E-mail" />
                </div>
                <div className="form-group">
                  <BsFillLockFill className="icon" />
                  <input type="password" placeholder="Senha" />
                </div>
                <div className="form-group">
                  <BsFillLockFill className="icon" />
                  <input type="password" placeholder="Confirmação de senha" />
                </div>
                <button className="btn-cadastrar">Cadastrar</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 EcoBalance — Todos os direitos reservados</p>
      </footer>
    </div>
  );
};

export default Login;
