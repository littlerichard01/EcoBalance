import React from 'react';
import './Login.css';
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';

const NovaSenha = () => {
  return (
    <div className="pagina-login">
      <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />
      <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />

      <header className="header">
        <div className="header-top">
          <img src={logo} alt="Logo" className="logo" />
          <div className="header-right">
            <button className="toggle-theme">🌞</button>
            <button className="btn-entrar">Entrar</button>
          </div>
        </div>
      </header>

      <div className="nav-bar">
        <div className="nav-metade-esquerda">
          <span className="nav-link">Início</span>
        </div>
        <div className="nav-metade-direita">
          <span className="nav-link">Testes</span>
        </div>
      </div>

      <main className="login-container">
        <div className="login-box-wrapper">
          <div className="login-box" style={{ justifyContent: 'center' }}>
            <div className="login-section">
              <h2 className="login-title">Redefinir Senha</h2>
              <div className="login-form-box">
                <div className="form-group">
                  <input type="password" placeholder="Nova senha" />
                </div>
                <div className="form-group">
                  <input type="password" placeholder="Confirmar nova senha" />
                </div>
                <button className="btn-login">Redefinir</button>
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

export default NovaSenha;
