import React, { useState } from 'react';
import './Login.css';
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import { useNavigate } from 'react-router-dom';

const Rotinas = () => {
  const navigate = useNavigate();
  const handleUsuarioAcesso = () => navigate('/info-cadastro');

  const [etapaAtual, setEtapaAtual] = useState(0);
  const [nomeRotina, setNomeRotina] = useState('');
  const [dieta, setDieta] = useState('');
  const [porcoes, setPorcoes] = useState({});
  const [tipoGas, setTipoGas] = useState('');
  const [tipoBotijao, setTipoBotijao] = useState('');
  const [tempoDuracaoGas, setTempoDuracaoGas] = useState(1);
  const [usaVeiculo, setUsaVeiculo] = useState(null);
  const [possuiVeiculo, setPossuiVeiculo] = useState(null);
  const [combustivel, setCombustivel] = useState('');
  const [litrosCombustivel, setLitrosCombustivel] = useState(0);
  const [kmEletrico, setKmEletrico] = useState(0);
  const [transportesPublicos, setTransportesPublicos] = useState([]);
  const [kmTransportes, setKmTransportes] = useState({});
  const avancarEtapa = () => setEtapaAtual((prev) => prev + 1);
  const voltarEtapa = () => setEtapaAtual((prev) => prev - 1);

  const toggleTransporte = (tipo) => {
    setTransportesPublicos((prev) =>
      prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
    );
  };

  const alimentos = [
    'Carne bovina', 'Carne suína', 'Frango', 'Peixe',
    'Leite', 'Ovos', 'Leguminosas', 'Frutas e vegetais', 'Cereais integrais'
  ];

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
    {
      titulo: 'Alimentos',
      conteudo: (
        <>
          <label className="pergunta">Selecione a sua dieta:</label>
          <small className="ajuda">Caso sua dieta não esteja dentro das opções, selecione Onívora.</small>
          <select
            className="input-texto"
            value={dieta}
            onChange={(e) => setDieta(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="Onívora">Onívora</option>
            <option value="Vegetariana">Vegetariana</option>
            <option value="Vegana">Vegana</option>
            <option value="Pescetariana">Pescetariana</option>
            <option value="Carnívora">Carnívora</option>
          </select>
          <label className="pergunta">Porções consumidas por semana:</label>
          <small className="ajuda">Considere que uma porção equivale a uma refeição média do alimento selecionado.</small>
          {alimentos.map((alimento) => (
            <div className="linha-porcao" key={alimento}>
              <span>{alimento}</span>
              <input
                type="number"
                min="0"
                className="spinner"
                value={porcoes[alimento] || 0}
                onChange={(e) =>
                  setPorcoes({ ...porcoes, [alimento]: parseInt(e.target.value) })
                }
              />
            </div>
          ))}
        </>
      )
    },
    {
      titulo: 'Gás de Cozinha',
      conteudo: (
        <>
          <label className="pergunta">Você utiliza gás encanado ou compra botijões?</label>
          <div className="radio-group">
            <label><input type="radio" value="encanado" checked={tipoGas === 'encanado'} onChange={(e) => setTipoGas(e.target.value)} /> Gás encanado</label>
            <label><input type="radio" value="botijao" checked={tipoGas === 'botijao'} onChange={(e) => setTipoGas(e.target.value)} /> Botijão</label>
          </div>
          {tipoGas === 'botijao' && (
            <>
              <label className="pergunta">Qual tipo de botijão?</label>
              <select
                className="input-texto"
                value={tipoBotijao}
                onChange={(e) => setTipoBotijao(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="P13">Comum P13</option>
                <option value="P20">Médio P20</option>
                <option value="P45">Grande P45</option>
              </select>
            </>
          )}
          <label className="pergunta">Quanto tempo dura o gás que você compra?</label>
          <input
            type="number"
            min="1"
            className="spinner"
            value={tempoDuracaoGas}
            onChange={(e) => setTempoDuracaoGas(e.target.value)}
          /> meses
        </>
      )
    },
    {
      titulo: 'Veículos',
      conteudo: (
        <>
          <label className="pergunta">Você utiliza algum tipo de veículo durante a semana?</label>
          <div className="radio-group">
            <label><input type="radio" value="sim" checked={usaVeiculo === 'sim'} onChange={(e) => setUsaVeiculo(e.target.value)} /> Sim</label>
            <label><input type="radio" value="nao" checked={usaVeiculo === 'nao'} onChange={(e) => setUsaVeiculo(e.target.value)} /> Não</label>
          </div>
          {usaVeiculo === 'sim' && (
            <>
              <label className="pergunta">Você possui um veículo ou utiliza transporte público?</label>
              <div className="radio-group">
                <label><input type="radio" value="proprio" checked={possuiVeiculo === 'proprio'} onChange={(e) => setPossuiVeiculo(e.target.value)} /> Veículo próprio</label>
                <label><input type="radio" value="publico" checked={possuiVeiculo === 'publico'} onChange={(e) => setPossuiVeiculo(e.target.value)} /> Transporte público</label>
              </div>
              {possuiVeiculo === 'proprio' && (
                <>
                  <label className="pergunta">Tipo de combustível:</label>
                  <select
                    className="input-texto"
                    value={combustivel}
                    onChange={(e) => setCombustivel(e.target.value)}
                  >
                    <option value="">Selecione...</option>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Etanol anidro">Etanol anidro</option>
                    <option value="Etanol hidratado">Etanol hidratado</option>
                    <option value="Elétrico">Veículo elétrico</option>
                  </select>
                  {combustivel === 'Elétrico' ? (
                    <>
                      <label className="pergunta">Km por semana com veículo elétrico:</label>
                      <input
                        type="number"
                        className="spinner"
                        value={kmEletrico}
                        onChange={(e) => setKmEletrico(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <label className="pergunta">Litros abastecidos por mês:</label>
                      <input
                        type="number"
                        className="spinner"
                        value={litrosCombustivel}
                        onChange={(e) => setLitrosCombustivel(e.target.value)}
                      />
                    </>
                  )}
                </>
              )}
              {possuiVeiculo === 'publico' && (
                <>
                  <label className="pergunta">Transportes usados na semana:</label>
                  {['Ônibus', 'Ônibus elétrico', 'Metrô', 'Trem', 'Carro (app)', 'Motocicleta (app)'].map((tipo) => (
                    <div key={tipo} className="linha-porcao">
                      <label>
                        <input
                          type="checkbox"
                          checked={transportesPublicos.includes(tipo)}
                          onChange={() => toggleTransporte(tipo)}
                        />{' '}
                        {tipo}
                      </label>
                      {transportesPublicos.includes(tipo) && (
                        <input
                          type="number"
                          placeholder="Km semanais"
                          className="spinner pequeno"
                          value={kmTransportes[tipo] || ''}
                          onChange={(e) =>
                            setKmTransportes({
                              ...kmTransportes,
                              [tipo]: parseInt(e.target.value),
                            })
                          }
                        />
                      )}
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </>
      )
    },
    {
      titulo: 'Finalizado!',
      conteudo: (
        <>
          <p className="pergunta">Parabéns por completar sua rotina sustentável! 🎉</p>
          <button className="botao" onClick={() => alert('Rotina salva com sucesso!')}>
            Salvar Rotina
          </button>
        </>
      )
    }
  ];

  return (
    <div className="rotinas-container">
      <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />
      <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />
      <header className="header">
        <div className="header-top">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="header-right">



          <div className="header-links">
            <span className="navlink" >Página inicial</span>
            <span className="navlink">Testes</span>
          </div>



          <img src={avatar} alt="Avatar do usuário" className="icone-avatar" onClick={handleUsuarioAcesso} />
        </div>


      </header>

      <main className="conteudo-rotinas">
        <div className="progresso-bolinhas">
          {etapas.map((_, index) => (
            <span
              key={index}
              className={`bolinha ${index === etapaAtual ? 'ativa' : ''}`}
            ></span>
          ))}
        </div>
        <h2>{etapas[etapaAtual].titulo}</h2>
        <div className="formulario">{etapas[etapaAtual].conteudo}</div>
        <div className="botoes-navegacao">
          {etapaAtual > 0 && (
            <button className="botao secundario" onClick={voltarEtapa}>
              Voltar
            </button>
          )}
          {etapaAtual < etapas.length - 1 && (
            <button className="botao primario" onClick={avancarEtapa}>
              Avançar
            </button>
          )}
        </div>
      </main>
   
      <footer className="footer">
        <p>© 2025 EcoBalance — Todos os direitos reservados</p>
      </footer>
    </div>

  );
};

export default Rotinas;


