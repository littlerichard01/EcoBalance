import React, { useState } from 'react';
import './Login.css';
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Rotinas = () => {
  const navigate = useNavigate();
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [nomeRotina, setNomeRotina] = useState('');

  const avancarEtapa = () => {
    setEtapaAtual((prev) => prev + 1);
  };

  const etapas = [
    {
      titulo: 'Nome da Rotina',
      conteudo: (
        <>
          <label className="pergunta">Digite o nome da sua rotina:</label>
          <input
            type="text"
            className="input-texto"
            value={nomeRotina}
            onChange={(e) => setNomeRotina(e.target.value)}
            placeholder="Ex: Semana Sustentável"
          />
        </>
      )
    },
    // Outros tópicos virão aqui depois
  ];

  return (
    <div className="pagina-rotina">
      <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />
      <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />

      <header className="header">
        <div className="header-top">
          <img src={logo} alt="Logo" className="logo" />
          <div className="header-right">
            <button className="toggle-theme">🌞</button>
            <button className="btn-entrar" onClick={() => navigate('/login')}>Entrar</button>
          </div>
        </div>
      </header>

      <main className="rotina-container">
        <div className="progresso-bolinhas">
          {[...Array(4)].map((_, index) => (
            <span key={index} className={`bolinha ${etapaAtual === index ? 'ativa' : ''}`} />
          ))}
        </div>

        <h2 className="titulo-topico">{etapas[etapaAtual].titulo}</h2>
        <div className="conteudo-topico">{etapas[etapaAtual].conteudo}</div>

        <div className="btn-wrapper">
          <button className="btn-proximo" onClick={avancarEtapa}>
            Próxima Tópico
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 EcoBalance — Todos os direitos reservados</p>
      </footer>
    </div>
  );
};

export default Rotinas;
