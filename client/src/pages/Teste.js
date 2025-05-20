import React, { useEffect, useState } from 'react';
import './Login.css'; // Importando o CSS existente
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import bandeiraBrasil from '../assets/bandeira-brasil.png';
import bandeiraReinoUnido from '../assets/bandeira-reinounido.png';

const textos = {
  pt: {
    paginaInicial: 'Página inicial',
    testes: 'Testes',
    entrar: 'Entrar',
    nomeDaRotina: '',
    rodape: '© 2025 EcoBalance — Todos os direitos reservados',
    tema: 'Tema:',
    altoContraste: 'Alto Contraste:',
    idioma: 'Idioma',
    TituloNome: 'Nome da Rotina',
PerguntaNome: 'Digite o nome da sua rotina:',
PlaceHolderNome: 'Ex: Semana Sustentável',
TituloAlimentos: 'Alimentos',
SelecioneDieta: 'Selecione a sua dieta:',
TooltipDieta: 'Caso sua dieta não esteja dentro das opções, selecione Onívora.',
SelecioneTresPontinhos: 'Selecione...',
DietaOnivora: 'Onivora',
DietaVegetariana: 'Vegetariana',
DietaVegana: 'Vegana',
DietaPescetariana: 'Pescetariana',
DietaCarnivora: 'Carnívora',
PorcoesConsumidas: 'Porções consumidas por semana:',
AjudaPorcoes: 'Considere que uma porção equivale a uma refeição média do alimento selecionado.',
TituloGas: 'Gás de Cozinha',
PerguntaGas: 'Você utiliza gás encanado ou compra botijões?',
SelecaoEncanado: 'Gás encanado',
SelecaoBotijao: 'Botijão',
PerguntaTipoBotijão: 'Qual tipo de botijão?',
BotijaoP13: 'Comum P13',
BotijaoP20: 'Médio P20',
BotijaoP45: 'Grande P45',
PerguntaDuracaoBotijao: 'Quanto tempo dura o gás que você compra?',
MesesBotijao: 'meses',
PerguntaMetrosCubicos: 'Digite o valor em metros cúbicos (m³) da sua última conta de gás natural corrigido:',
ExemploMetrosCubicos: 'Ex: 25',
TitulosVeiculos: 'Veículos',
PerguntaVeiculoSemana: 'Você utiliza algum tipo de veículo durante a semana?',
RespostaSim: 'Sim',
RespostaNao: 'Não',
PerguntaVeiculoOuPublico: 'Você possui um veículo ou utiliza transporte público?',
SelecaoVeiculoProprio: 'Veículo próprio',
SelecaoPublico: 'Transporte público',
PerguntaTipoCombustivel: 'Tipo de combustível:',
SelecaoGasolina: 'Gasolina',
SelecaoDiesel: 'Diesel',
SelecaoEtanol: 'Etanol',
SelecaoEletrico: 'Veículo elétrico',
SelecaoNenhum: 'Não utiliza combustível',
KmVeiculoEletrico: 'Km por semana com veículo elétrico:',
LitrosPorMes: 'Litros abastecidos por mês:',
TransportesSemana: 'Transportes usados na semana:',
PlaceholderSemanal: 'Km semanais',
TituloEnergiaEletrica: 'Energia elétrica',
ContaDeEnergia: 'Digite o valor de KWh da sua última conta de energia elétrica:',
TituloViagens: 'Viagens',
PerguntaViagem: 'Você fez alguma viagem no último mês?',
DicaViagens: 'Considere viagens longas ou curtas, como viagens de carro de aplicativo, etc.',
PerguntaViagemInternacional: 'Foi uma viagem internacional?',
DicaViagemInternacional: 'Selecione "Sim." se fez mais de uma viagem diferente no último mês.',
NaoFoiInternacional: 'Não, foi uma viagem nacional.',
VeiculosQueViajou: 'Qual (ou quais) veículo(s) você utilizou para viajar?',
TituloCalcular: 'Calcular',
CliqueEmCalcular: 'Clique em calcular para ver os resultados do seu teste!',
TituloResultados: 'Resultados',
BotaoVoltar: 'Voltar',
BotaoAvancar: 'Avançar',
BotaoCadastreSe: 'Cadastre-se',
  },
  en: {
    paginaInicial: 'Homepage',
    testes: 'Tests',
    entrar: 'Login',
    
    rodape: '© 2025 EcoBalance — All rights reserved',
    tema: 'Theme:',
    altoContraste: 'High Contrast:',
    idioma: 'Language',
    TituloNome: 'Routine Name',
PerguntaNome: 'Enter the name of your routine:',
PlaceHolderNome: 'E.g.: Sustainable Week',
TituloAlimentos: 'Food',
SelecioneDieta: 'Select your diet:',
TooltipDieta: 'If your diet is not listed, select Omnivore.',
SelecioneTresPontinhos: 'Select...',
DietaOnivora: 'Omnivore',
DietaVegetariana: 'Vegetarian',
DietaVegana: 'Vegan',
DietaPescetariana: 'Pescetarian',
DietaCarnivora: 'Carnivore',
PorcoesConsumidas: 'Portions consumed per week:',
AjudaPorcoes: 'Consider one portion as an average meal of the selected food.',
TituloGas: 'Cooking Gas',
PerguntaGas: 'Do you use piped gas or buy gas cylinders?',
SelecaoEncanado: 'Piped gas',
SelecaoBotijao: 'Cylinder',
PerguntaTipoBotijão: 'What type of cylinder?',
BotijaoP13: 'Standard P13',
BotijaoP20: 'Medium P20',
BotijaoP45: 'Large P45',
PerguntaDuracaoBotijao: 'How long does your gas cylinder last?',
MesesBotijao: 'months',
PerguntaMetrosCubicos: 'Enter the amount in cubic meters (m³) from your last corrected piped gas bill:',
ExemploMetrosCubicos: 'E.g.: 25',
TitulosVeiculos: 'Vehicles',
PerguntaVeiculoSemana: 'Do you use any type of vehicle during the week?',
RespostaSim: 'Yes',
RespostaNao: 'No',
PerguntaVeiculoOuPublico: 'Do you own a vehicle or use public transport?',
SelecaoVeiculoProprio: 'Own vehicle',
SelecaoPublico: 'Public transport',
PerguntaTipoCombustivel: 'Fuel type:',
SelecaoGasolina: 'Gasoline',
SelecaoDiesel: 'Diesel',
SelecaoEtanol: 'Ethanol',
SelecaoEletrico: 'Electric vehicle',
SelecaoNenhum: 'Does not use fuel',
KmVeiculoEletrico: 'Km per week with electric vehicle:',
LitrosPorMes: 'Liters fueled per month:',
TransportesSemana: 'Transports used during the week:',
PlaceholderSemanal: 'Weekly km',
TituloEnergiaEletrica: 'Electricity',
ContaDeEnergia: 'Enter the KWh value from your last electricity bill:',
TituloViagens: 'Trips',
PerguntaViagem: 'Did you take any trips last month?',
DicaViagens: 'Consider both long and short trips, including ride-hailing apps, etc.',
PerguntaViagemInternacional: 'Was it an international trip?',
DicaViagemInternacional: 'Select "Yes" if you made more than one different trip last month.',
NaoFoiInternacional: 'No, it was a national trip.',
VeiculosQueViajou: 'Which vehicle(s) did you use to travel?',
TituloCalcular: 'Calculate',
CliqueEmCalcular: 'Click to calculate and see your test results!',
TituloResultados: 'Results',
BotaoVoltar: 'Back',
BotaoAvancar: 'Next',
BotaoCadastreSe: 'Sign up',
  },
};

const Teste = () => {
    const [idiomaSelecionado, setIdiomaSelecionado] = useState(() => {
        return localStorage.getItem('language') || 'pt'; // Usa o valor salvo ou define 'pt' como padrão
      });
    const [mostrarDropdownIdioma, setMostrarDropdownIdioma] = useState(false);
    const [temaEscuro, setTemaEscuro] = useState(false);
    const [altoContrasteAtivo, setAltoContrasteAtivo] = useState(false);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleInicioClick = () => {
    navigate('/');
  };
  const handleTesteClick = () => {
    navigate('/teste')
  }

  const [etapaAtual, setEtapaAtual] = useState(0);

  const [mensagemErroTeste, setMensagemErroTeste] = useState('');

  const [kwhContaLuz, setKwhContaLuz] = useState(0);
  const [m3GasNatural, setM3GasNatural] = useState(0);
  const [fezViagem, setFezViagem] = useState(null);
  const [viagemInternacional, setViagemInternacional] = useState(null);
  const [veiculosViagem, setVeiculosViagem] = useState({});
  const [kmPorVeiculoViagem, setKmPorVeiculoViagem] = useState({});

  const [nomeRotina, setNomeRotina] = useState('');
  const [dieta, setDieta] = useState('');
  const [porcoes, setPorcoes] = useState({});
  const [tipoGas, setTipoGas] = useState('');
  const [tipoBotijao, setTipoBotijao] = useState('');
  const [tempoDuracaoGas, setTempoDuracaoGas] = useState(0);
  const [usaVeiculo, setUsaVeiculo] = useState(null);
  const [possuiVeiculo, setPossuiVeiculo] = useState(null);
  const [combustivel, setCombustivel] = useState('');
  const [litrosCombustivel, setLitrosCombustivel] = useState(0);
  const [kmEletrico, setKmEletrico] = useState(0);
  const [transportesPublicos, setTransportesPublicos] = useState([]);
  const [kmTransportes, setKmTransportes] = useState({});

  const [dadosGrafico, setDadosGrafico] = useState([]);

  const avancarEtapa = () => {
    setMensagemErroTeste('');

    if (etapaAtual === 0 && !nomeRotina.trim()) {
      setMensagemErroTeste("Por favor, insira um nome para sua rotina.");
      return;
    }

    if (etapaAtual === 1 && !dieta) {
      setMensagemErroTeste("Por favor, selecione uma dieta e preencha quantidades de porções de alimentos consumidos.")
      return;
    }

    if (!tipoGas && etapaAtual === 2) {
      setMensagemErroTeste("Por favor, selecione uma opção.");
      return;
    } else if (tipoGas !== 'encanado' && etapaAtual === 2) {
      if (!tipoBotijao && etapaAtual === 2) {
        setMensagemErroTeste("Por favor, selecione um tipo de botijão de gás.");
        return;
      } else if (!tempoDuracaoGas && etapaAtual === 2) {
        setMensagemErroTeste("Por favor, digite quantos meses seu gás costuma durar.");
        return;
      }
    } else if (tipoGas === 'encanado' && etapaAtual === 2) {
      if (isNaN(Number(m3GasNatural)) || Number(m3GasNatural) <= 0) {
        setMensagemErroTeste('Por favor, digite um valor válido para o m³ da conta de gás natural.');
        return;
      }
    }

    if (!usaVeiculo && etapaAtual === 3) {
      setMensagemErroTeste("Por favor, selecione uma opção.");
      return;
    } else if (usaVeiculo !== 'nao' && etapaAtual === 3) {
      if (!possuiVeiculo && etapaAtual === 3) {
        setMensagemErroTeste("Por favor, selecione uma opção.");
        return;
      } else if (possuiVeiculo === 'proprio' && etapaAtual === 3) {
        if (!combustivel && etapaAtual === 3) {
          setMensagemErroTeste("Por favor, selecione um tipo de combustível.");
          return;
        } else if (combustivel !== 'Nenhum' && combustivel !== 'Elétrico' && !litrosCombustivel && etapaAtual === 3) {
          setMensagemErroTeste("Por favor, digite quantos litros de combustível você abastece por mês.");
          return;
        } else if (combustivel === 'Elétrico' && etapaAtual === 3 && (isNaN(Number(kmEletrico)) || Number(kmEletrico) <= 0) && etapaAtual === 3) {
          setMensagemErroTeste("Por favor, digite quantos quilômetros você percorre durante um mês com seu veículo elétrico.");
          return;
        }
      } else if (possuiVeiculo === 'publico' && etapaAtual === 3 && Object.keys(transportesPublicos).length === 0) {
        setMensagemErroTeste('Por favor, selecione pelo menos um veículo utilizado durante a semana.');
        return;
      }
    }

    if (etapaAtual === 4 && (isNaN(Number(kwhContaLuz)) || Number(kwhContaLuz) <= 0)) {
      setMensagemErroTeste('Por favor, digite um valor válido para o KWh da conta de luz.');
      return;
    }

    if (etapaAtual === 5 && (fezViagem === null)) {
      setMensagemErroTeste('Por favor, selecione se você fez alguma viagem no último mês.');
      return;
    } else if (etapaAtual === 5 && fezViagem === 'sim' && viagemInternacional === null) {
      setMensagemErroTeste('Por favor, selecione o tipo de viagem.');
      return;
    } else if (etapaAtual === 5 && fezViagem === 'sim' && Object.keys(veiculosViagem).length === 0) {
      setMensagemErroTeste('Por favor, selecione pelo menos um veículo utilizado na viagem.');
      return;
    }
    for (const veiculo in veiculosViagem) {
      if (veiculosViagem[veiculo] && (isNaN(Number(kmPorVeiculoViagem[veiculo])) || Number(kmPorVeiculoViagem[veiculo]) <= 0)) {
        setMensagemErroTeste(`Por favor, digite a distância percorrida para o veículo: ${veiculo}.`);
        return;
      }
    }

    setEtapaAtual((prev) => prev + 1);
  };

  const voltarEtapa = () => {
    setMensagemErroTeste('');
    setEtapaAtual((prev) => prev - 1);
  };

  const toggleVeiculoViagem = (veiculo) => {
    setVeiculosViagem((prev) => ({
      ...prev,
      [veiculo]: !prev[veiculo],
    }));
    setKmPorVeiculoViagem((prev) => ({
      ...prev,
      [veiculo]: prev[veiculo] || 0,
    }));
  };

  useEffect(() => {
    if (fezViagem === 'nao') {
      setVeiculosViagem({});
      setKmPorVeiculoViagem({});
      setViagemInternacional(null);
    }
  }, [fezViagem]);

  useEffect(() => {
    if (usaVeiculo === 'nao') {
      setPossuiVeiculo(null);
      setCombustivel('');
      setLitrosCombustivel(0);
      setKmEletrico(0);
      setTransportesPublicos([]);
      setKmTransportes({});
    }
  }, [usaVeiculo]);

  const toggleTransporte = (tipo) => {
    setTransportesPublicos((prev) => {
      if (prev.includes(tipo)) {
        const novosTransportes = prev.filter((t) => t !== tipo);
        const novosKmTransportes = { ...kmTransportes };
        delete novosKmTransportes[tipo]; // Zera o valor do transporte removido
        setKmTransportes(novosKmTransportes);
        return novosTransportes;
      } else {
        return [...prev, tipo];
      }
    });
  };

  const alimentos = [
    'Carne bovina', 'Carne suína', 'Frango', 'Peixe',
    'Leite', 'Ovos', 'Leguminosas', 'Frutas e vegetais', 'Cereais integrais'
  ];

  const alimentosPermitidosPorDieta = {
    Onívora: alimentos, // todos
    Vegetariana: alimentos.filter(a => !['Carne bovina', 'Carne suína', 'Frango', 'Peixe'].includes(a)),
    Vegana: alimentos.filter(a => !['Carne bovina', 'Carne suína', 'Frango', 'Peixe', 'Leite', 'Ovos'].includes(a)),
    Pescetariana: alimentos.filter(a => !['Carne bovina', 'Carne suína', 'Frango'].includes(a)),
    Carnívora: ['Carne bovina', 'Carne suína', 'Frango', 'Peixe', 'Leite', 'Ovos']
  };

  const etapas = [
    {
      titulo: textos[idiomaSelecionado]?.TituloNome,
      conteudo: (
        <>
          <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaNome}</label>
          <input
            type="text"
            className="input-texto"
            value={nomeRotina}
            onChange={(e) => setNomeRotina(e.target.value)}
            placeholder={textos[idiomaSelecionado]?.PlaceHolderNome}
          />
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      )
    },
    {
      titulo: textos[idiomaSelecionado]?.TituloAlimentos,
      conteudo: (
        <>
          <label className="pergunta">{textos[idiomaSelecionado]?.SelecioneDieta}</label>
          <small className="ajuda">{textos[idiomaSelecionado]?.TooltipDieta}</small>
          <select
            className="input-texto"
            value={dieta}
            onChange={(e) => {
              const novaDieta = e.target.value;
              setDieta(novaDieta);

              const alimentosPermitidos = new Set(alimentosPermitidosPorDieta[novaDieta] || []);
              const novasPorcoes = { ...porcoes };

              alimentos.forEach((alimento) => {
                if (!alimentosPermitidos.has(alimento)) {
                  novasPorcoes[alimento] = 0;
                }
              });

              setPorcoes(novasPorcoes);
            }}
          >
            <option value="">{textos[idiomaSelecionado]?.SelecioneTresPontinhos}</option>
            <option value="Onívora">{textos[idiomaSelecionado]?.DietaOnivora}</option>
            <option value="Vegetariana">{textos[idiomaSelecionado]?.DietaVegetariana}</option>
            <option value="Vegana">{textos[idiomaSelecionado]?.DietaVegana}</option>
            <option value="Pescetariana">{textos[idiomaSelecionado]?.DietaPescetariana}</option>
            <option value="Carnívora">{textos[idiomaSelecionado]?.DietaCarnivora}</option>
          </select>
          <label className="pergunta">{textos[idiomaSelecionado]?.PorcoesConsumidas}</label>
          <small className="ajuda">{textos[idiomaSelecionado]?.AjudaPorcoes}</small>
          {alimentos.map((alimento) => {
            const permitido = alimentosPermitidosPorDieta[dieta]?.includes(alimento) ?? true;

            return (
              <div className="linha-porcao" key={alimento}>
                <span style={{ opacity: permitido ? 1 : 0.5 }}>{alimento}</span>
                <input
                  type="number"
                  min="0"
                  className="spinner"
                  disabled={!permitido}
                  value={porcoes[alimento] || 0}
                  onChange={(e) =>
                    setPorcoes({ ...porcoes, [alimento]: parseInt(e.target.value) })
                  }
                />
              </div>
            );
          })}
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      )
    },
    {
      titulo: textos[idiomaSelecionado]?.TituloGas,
      conteudo: (
        <>
          <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaGas}</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="encanado"
                checked={tipoGas === 'encanado'}
                onChange={(e) => {
                  setTipoGas(e.target.value);
                  setM3GasNatural(0);          // Resetar m3
                }}
              />
              {textos[idiomaSelecionado]?.SelecaoEncanado}
            </label>
            <label>
              <input
                type="radio"
                value="botijao"
                checked={tipoGas === 'botijao'}
                onChange={(e) => {
                  setTipoGas('botijao');
                  setTipoBotijao('');         // Resetar seleção de tipo de botijão
                  setTempoDuracaoGas(0);      // Resetar duração
                }}
              />
              {textos[idiomaSelecionado]?.SelecaoBotijao}
            </label>
          </div>
          {tipoGas === 'botijao' && (
            <>
              <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaTipoBotijão}</label>
              <select
                className="input-texto"
                value={tipoBotijao}
                onChange={(e) => setTipoBotijao(e.target.value)}
              >
                <option value="">{textos[idiomaSelecionado]?.SelecioneTresPontinhos}</option>
                <option value="P13">{textos[idiomaSelecionado]?.BotijaoP13}</option>
                <option value="P20">{textos[idiomaSelecionado]?.BotijaoP20}</option>
                <option value="P45">{textos[idiomaSelecionado]?.BotijaoP45}</option>
              </select>
            </>
          )}
          {tipoGas === 'botijao' && (
            <>
              <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaDuracaoBotijao}</label>
              <input
                type="number"
                min="1"
                className="spinner"
                value={tempoDuracaoGas}
                onChange={(e) => setTempoDuracaoGas(e.target.value)}
              /> {textos[idiomaSelecionado]?.MesesBotijao}
            </>
          )}
          {tipoGas === 'encanado' && (
            <>
              <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaMetrosCubicos}</label>
              <input
                type="number"
                min="0"
                className="input-texto"
                value={m3GasNatural}
                onChange={(e) => setM3GasNatural(e.target.value)}
                placeholder={textos[idiomaSelecionado]?.ExemploMetrosCubicos}
              />
            </>
          )}
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      )
    },
    {
      titulo: textos[idiomaSelecionado]?.TitulosVeiculos,
      conteudo: (
        <>
          <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaVeiculoSemana}</label>
          <div className="radio-group">
            <label><input type="radio" value="sim" checked={usaVeiculo === 'sim'} onChange={(e) => setUsaVeiculo(e.target.value)} /> {textos[idiomaSelecionado]?.RespostaSim}</label>
            <label><input type="radio" value="nao" checked={usaVeiculo === 'nao'} onChange={(e) => setUsaVeiculo(e.target.value)} /> {textos[idiomaSelecionado]?.RespostaNao}</label>
          </div>
          {usaVeiculo === 'sim' && (
            <>
              <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaVeiculoOuPublico}</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="proprio"
                    checked={possuiVeiculo === 'proprio'}
                    onChange={(e) => {
                      setPossuiVeiculo(e.target.value);
                      // Limpar transportes públicos quando muda para veículo próprio
                      setTransportesPublicos([]);
                      setKmTransportes({});
                    }}
                  /> {textos[idiomaSelecionado]?.SelecaoVeiculoProprio}
                </label>
                <label>
                  <input
                    type="radio"
                    value="publico"
                    checked={possuiVeiculo === 'publico'}
                    onChange={(e) => {
                      setPossuiVeiculo(e.target.value);
                      // Limpar dados de veículo próprio quando muda para transporte público
                      setCombustivel('');
                      setLitrosCombustivel(0);
                      setKmEletrico(0);
                    }}
                  /> {textos[idiomaSelecionado]?.SelecaoPublico}
                </label>
              </div>
              {possuiVeiculo === 'proprio' && (
                <>
                  <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaTipoCombustivel}</label>
                  <select
                    className="input-texto"
                    value={combustivel}
                    onChange={(e) => {
                      const novoCombustivel = e.target.value;
                      setCombustivel(novoCombustivel);
                      setLitrosCombustivel(0);
                      setKmEletrico(0);
                    }}
                  >
                    <option value="">{textos[idiomaSelecionado]?.SelecioneTresPontinhos}</option>
                    <option value="Gasolina">{textos[idiomaSelecionado]?.SelecaoGasolina}</option>
                    <option value="Diesel">{textos[idiomaSelecionado]?.SelecaoDiesel}</option>
                    <option value="Etanol">{textos[idiomaSelecionado]?.SelecaoEtanol}</option>
                    <option value="Elétrico">{textos[idiomaSelecionado]?.SelecaoEletrico}</option>
                    <option value="Nenhum">{textos[idiomaSelecionado]?.SelecaoNenhum}</option>
                  </select>
                  {combustivel === 'Elétrico' && (
                    <>
                      <label className="pergunta">{textos[idiomaSelecionado]?.KmVeiculoEletrico}</label>
                      <input
                        type="number"
                        min="0"
                        className="spinner"
                        value={kmEletrico}
                        onChange={(e) => setKmEletrico(e.target.value)}
                        disabled={combustivel === 'Nenhum'}
                      />
                    </>
                  )}

                  {combustivel !== 'Elétrico' && combustivel !== 'Nenhum' && (
                    <>
                      <label className="pergunta">{textos[idiomaSelecionado]?.LitrosPorMes}</label>
                      <input
                        type="number"
                        min="0"
                        className="spinner"
                        value={litrosCombustivel}
                        onChange={(e) => setLitrosCombustivel(e.target.value)}
                        disabled={combustivel === 'Nenhum'}
                      />
                    </>
                  )}
                </>
              )}
              {possuiVeiculo === 'publico' && (
                <>
                  <label className="pergunta">{textos[idiomaSelecionado]?.TransportesSemana}</label>
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
                          min="0"
                          placeholder={textos[idiomaSelecionado]?.PlaceholderSemanal}
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
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      )
    },
    {
      titulo: textos[idiomaSelecionado]?.TituloEnergiaEletrica,
      conteudo: (
        <>
          <label className="pergunta">{textos[idiomaSelecionado]?.ContaDeEnergia}</label>
          <input
            type="number"
            min="0"
            className="input-texto"
            value={kwhContaLuz}
            onChange={(e) => setKwhContaLuz(e.target.value)}
            placeholder="Ex: 150"
          />
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      ),
    },
    {
      titulo: textos[idiomaSelecionado]?.TituloViagens,
      conteudo: (
        <>
          <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaViagem}</label>
          <small className="ajuda pequeno">{textos[idiomaSelecionado]?.DicaViagens}</small>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="sim"
                checked={fezViagem === 'sim'}
                onChange={(e) => setFezViagem(e.target.value)}
              /> {textos[idiomaSelecionado]?.RespostaSim}
            </label>
            <label>
              <input
                type="radio"
                value="nao"
                checked={fezViagem === 'nao'}
                onChange={(e) => setFezViagem(e.target.value)}
              /> {textos[idiomaSelecionado]?.RespostaNao}
            </label>
          </div>

          {fezViagem === 'sim' && (
            <>
              <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaViagemInternacional}</label>
              <small className="ajuda pequeno">{textos[idiomaSelecionado]?.DicaViagemInternacional}</small>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="sim"
                    checked={viagemInternacional === 'sim'}
                    onChange={(e) => setViagemInternacional(e.target.value)}
                  /> {textos[idiomaSelecionado]?.RespostaSim}
                </label>
                <label>
                  <input
                    type="radio"
                    value="nao"
                    checked={viagemInternacional === 'nao'}
                    onChange={(e) => setViagemInternacional(e.target.value)}
                  /> {textos[idiomaSelecionado]?.NaoFoiInternacional}
                </label>
              </div>

              <label className="pergunta">{textos[idiomaSelecionado]?.VeiculosQueViajou}</label>
              <div className="checkbox-group">
                {['Carro', 'Carro elétrico', 'Moto', 'Ônibus', 'Metrô', 'Trem', 'Avião', 'Barco/cruzeiro'].map((veiculo) => (
                  <div key={veiculo} className="linha-checkbox-km">
                    <label>
                      <input
                        type="checkbox"
                        checked={veiculosViagem[veiculo] || false}
                        onChange={() => toggleVeiculoViagem(veiculo)}
                      /> {veiculo}
                    </label>
                    {veiculosViagem[veiculo] && (
                      <input
                        type="number"
                        min="0"
                        className="spinner pequeno"
                        placeholder="Km"
                        value={kmPorVeiculoViagem[veiculo] || ''}
                        onChange={(e) => setKmPorVeiculoViagem((prev) => ({ ...prev, [veiculo]: e.target.value }))}
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      ),
    },
    {
      titulo: textos[idiomaSelecionado]?.TituloCalcular,
      conteudo: (
        <>
          <p className="pergunta">{textos[idiomaSelecionado]?.CliqueEmCalcular}</p>

        </>
      ),
    },
    {
      titulo: textos[idiomaSelecionado]?.TituloResultados,
      conteudo: (
        <>

        </>
      ),
    },
  ];

  const calcularEmissoesSeparadas = () => {
    // Fatores rotina
    const fatores = {
      alimentos: {
        'Carne bovina': 6.136,
        'Carne suína': 1.149,
        'Frango': 0.591,
        'Peixe': 0.389,
        'Leite': 0.594,
        'Ovos': 0.186,
        'Leguminosas': 0.055,
        'Frutas e vegetais': 0.135,
        'Cereais integrais': 0.176
      },
      gas: {
        P13: 35.711,
        P20: 54.94,
        P45: 123.615
      },
      combustiveis: {
        Gasolina: 2.31,
        Diesel: 2.68,
        Etanol: 1.44
      },
      transportes: {
        'Ônibus': 0.016,
        'Ônibus elétrico': 0,
        'Metrô': 0.0035,
        'Trem': 0.019,
        'Carro (app)': 0.1268,
        'Motocicleta (app)': 0.0711
      },
      eletrico: 0.0891
    };

    // Calculo Alimentos
    let alimentosTotal = 0;
    Object.entries(porcoes).forEach(([alimento, quantidade]) => {
      const fator = fatores.alimentos[alimento] || 0;
      alimentosTotal += ((quantidade * fator) * 4);
    });

    // Calculo Gás Botijão
    let usaGasEncanado = tipoGas === 'encanado';
    let emissaoCarbonoBotijao = 0;
    if (!usaGasEncanado && tipoBotijao && tempoDuracaoGas) {
      const fator = fatores.gas[tipoBotijao];
      emissaoCarbonoBotijao = fator / tempoDuracaoGas;
    }

    // Calculo Veículos Rotina
    let veiculosTotal = 0;
    if (usaVeiculo === 'sim' && possuiVeiculo === 'proprio') {
      if (combustivel === 'Elétrico') {
        veiculosTotal += (kmEletrico * fatores.eletrico) * 4;
      } else {
        veiculosTotal += litrosCombustivel * (fatores.combustiveis[combustivel] || 0);
      }
    } else if (usaVeiculo === 'sim' && possuiVeiculo === 'publico') {
      transportesPublicos.forEach((tipo) => {
        const km = kmTransportes[tipo] || 0;
        const fator = fatores.transportes[tipo] || 0;
        veiculosTotal += km * fator;
      });
      veiculosTotal = veiculosTotal * 4;
    }

    // Fatores teste
    const fatorKwh = 0.0385;
    const fatorGas = 1.974;
    const fatoresVeiculo = {
      'Metrô': 0.0035,
      'Trem': 0.0019,
      'Ônibus': 0.016,
      'Carro': 0.1268,
      'Moto': 0.0711,
      'Carro elétrico': 0.0891,
      'Barco/cruzeiro': 0.250,
      'Avião': viagemInternacional === 'sim' ? 0.1542 : 0.10974,
    };

    // Cálculo de energia elétrica
    const emissaoEnergia = Number(kwhContaLuz) * fatorKwh;

    // Cálculo de gás encanado
    const emissaoGas = tipoGas === 'encanado' ? Number(m3GasNatural) * fatorGas : 0;

    // Cálculo de viagens
    const veiculosArray = Object.entries(veiculosViagem)
      .filter(([tipo, selecionado]) => selecionado)
      .map(([tipo]) => {
        const km = Number(kmPorVeiculoViagem[tipo]);
        const emissao = km * fatoresVeiculo[tipo];
        return { tipo, km, emissao };
      });

    // Cálculo de emissão total incluindo dados da rotina
    const emissaoTotal = emissaoEnergia + emissaoGas + veiculosArray.reduce((soma, v) => soma + v.emissao, 0) +
      (parseFloat(alimentosTotal.toFixed(2)) || 0) +
      (parseFloat(emissaoCarbonoBotijao.toFixed(2)) || 0) +
      (parseFloat(veiculosTotal.toFixed(2)) || 0);

    const rotinaParaSalvar = {
      usuarioId: null,
      nome: nomeRotina,
      dieta,
      porcoes,
      tipoGas,
      tipoBotijao,
      tempoDuracaoGas: Number(tempoDuracaoGas),
      usaVeiculo,
      possuiVeiculo,
      combustivel,
      litrosCombustivel: Number(litrosCombustivel),
      kmEletrico: Number(kmEletrico),
      transportesPublicos,
      kmTransportes,
      emissoes: {
        alimentos: alimentosTotal,
        gas: usaGasEncanado ? null : emissaoCarbonoBotijao,
        veiculos: veiculosTotal
      }
    };

    // Dados de teste para enviar para o banco se o usuário fizer cadastro
    const testeData = {
      usuario: null,
      rotina: null,
      energiaEletrica: {
        kwh: Number(kwhContaLuz),
        emissao: emissaoEnergia
      },
      gasNatural: {
        m3: tipoGas === 'encanado' ? Number(m3GasNatural) : 0,
        emissao: emissaoGas
      },
      viagem: {
        fezViagem: fezViagem === 'sim',
        internacional: fezViagem === 'sim' ? viagemInternacional === 'sim' : false,
        veiculos: veiculosArray
      },
      emissaoAlimentos: alimentosTotal,
      emissaoGas: usaGasEncanado ? null : emissaoCarbonoBotijao,
      emissaoVeiculos: veiculosTotal,
      emissaoTotal: emissaoTotal
    };

    // Salvar no localStorage
    localStorage.setItem('rotinaAnonima', JSON.stringify(rotinaParaSalvar));
    localStorage.setItem('testeAnonimo', JSON.stringify(testeData));

    return {
      rotinaParaSalvar,
      testeData
    };
  };

  const etapasFiltradas = etapas.filter((_, index) => {
    return true;
  });
  const etapaAtualFiltrada = Math.min(etapaAtual, etapasFiltradas.length - 1);

  const cores = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

  const getGraficoData = (teste) => {
    const resultados = calcularEmissoesSeparadas();
    const dados = [];

    // Viagens
    const emissaoViagens = resultados.testeData.viagem?.veiculos?.reduce((acc, v) => acc + (v.emissao || 0), 0);
    if (emissaoViagens > 0) {
      dados.push({ categoria: 'Viagens', valor: emissaoViagens });
    }

    // Gás (natural ou botijão)
    const emissaoGas = resultados.testeData.gasNatural?.emissao || resultados.rotinaParaSalvar.emissoes.gas || 0;
    if (emissaoGas > 0) {
      dados.push({ categoria: 'Gás', valor: emissaoGas });
    }

    // Energia elétrica
    const emissaoEnergia = resultados.testeData.energiaEletrica?.emissao || 0;
    if (emissaoEnergia > 0) {
      dados.push({ categoria: 'Energia', valor: emissaoEnergia });
    }

    // Alimentos
    const emissaoAlimentos = resultados.testeData.emissaoAlimentos || 0;
    if (emissaoAlimentos > 0) {
      dados.push({ categoria: 'Alimentos', valor: emissaoAlimentos });
    }

    // Veículos (uso semanal)
    const emissaoVeiculos = resultados.testeData.emissaoVeiculos || 0;
    if (emissaoVeiculos > 0) {
      dados.push({ categoria: 'Veículos', valor: emissaoVeiculos });
    }

    return dados;
  };

  const renderTooltipContent = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '8px', color: 'black' }}>
          <strong className='tooltips'>{`${name}: ${value.toFixed(2)} kgCO2`}</strong>
        </div>
      );
    }
    return null;
  };

  const handleCalcular = () => {
    const resultados = calcularEmissoesSeparadas();
    const dados = getGraficoData(resultados); // usa os dados recém-calculados
    setDadosGrafico(dados); // atualiza o estado que renderiza o gráfico
    setMensagemErroTeste('');
    setEtapaAtual((prev) => prev + 1);
  };



    useEffect(() => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark') {
        setTemaEscuro(true);
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
  
      const storedContrast = localStorage.getItem('highContrast');
      if (storedContrast === 'true') {
        setAltoContrasteAtivo(true);
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
  
      const storedLanguage = localStorage.getItem('language');
      if (storedLanguage) {
        setIdiomaSelecionado(storedLanguage);
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem('theme', temaEscuro ? 'dark' : 'light');
      document.body.classList.toggle('dark-mode', temaEscuro);
    }, [temaEscuro]);
  
    useEffect(() => {
      localStorage.setItem('highContrast', altoContrasteAtivo);
      document.body.classList.toggle('high-contrast', altoContrasteAtivo);
    }, [altoContrasteAtivo]);
  
    useEffect(() => {
      localStorage.setItem('language', idiomaSelecionado);
    }, [idiomaSelecionado]);



  const toggleIdiomaDropdown = () => {
    setMostrarDropdownIdioma(!mostrarDropdownIdioma);
  };

  const handleIdiomaSelecionado = (idioma) => {
    setIdiomaSelecionado(idioma);
    localStorage.setItem('language', idioma); // Salva no localStorage
    setMostrarDropdownIdioma(false);
  };

  const toggleTema = () => {
    setTemaEscuro(!temaEscuro);
  };

  const toggleAltoContraste = () => {
    setAltoContrasteAtivo(!altoContrasteAtivo);
  };

  return (
    <div className={`rotinas-container ${temaEscuro ? 'dark-mode' : ''} ${altoContrasteAtivo ? 'high-contrast' : ''}`}>
      <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />
      <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />
      <header className="header">
              <div className="header-top">
                <img src={logo} alt="Logo" className="logo" />
              </div>
      
              <div className="header-left-controls">
                <div className="dropdown-idioma">
                  <div className="idioma-selecionado" onClick={toggleIdiomaDropdown}>
                    <img
                      src={idiomaSelecionado === 'pt' ? bandeiraBrasil : bandeiraReinoUnido}
                      alt={idiomaSelecionado === 'pt' ? 'Português' : 'Inglês'}
                      className="bandeira-idioma"
                    />
                    <span>{textos[idiomaSelecionado]?.idioma}</span>
                    <i className="bi bi-chevron-down" style={{ marginLeft: '5px', fontSize: '0.8em', color: '#ffffff' }}></i>
                  </div>
                  {mostrarDropdownIdioma && (
                    <div className="dropdown-menu-idioma show">
                      {idiomaSelecionado !== 'pt' && (
                        <div className="dropdown-item-idioma" onClick={() => handleIdiomaSelecionado('pt')}>
                          <img src={bandeiraBrasil} alt="Português" className="bandeira-idioma-item" />
                          <span>Português</span>
                        </div>
                      )}
                      {idiomaSelecionado !== 'en' && (
                        <div className="dropdown-item-idioma" onClick={() => handleIdiomaSelecionado('en')}>
                          <img src={bandeiraReinoUnido} alt="Inglês" className="bandeira-idioma-item" />
                          <span>English</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
      
                <div className="tema-contraste-controles">
                  <div className="tema-controle">
                    <span>{textos[idiomaSelecionado]?.tema}</span>
                    <i
                      className={`bi ${temaEscuro ? 'bi-moon-fill' : 'bi-sun-fill'}`}
                      onClick={toggleTema}
                      style={{ cursor: 'pointer', fontSize: '1.5em' }}
                    ></i>
                  </div>
      
                  <div className="alto-contraste-container">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={altoContrasteAtivo}
                        onChange={toggleAltoContraste}
                      />
                      <span className="slider round"></span>
                    </label>
                    <span>{textos[idiomaSelecionado]?.altoContraste}</span>
                  </div>
                </div>
              </div>
      
              <div className="header-right">
                <div className="header-links">
                  <span className="navlink" onClick={handleInicioClick}>{textos[idiomaSelecionado]?.paginaInicial}</span>
                  <span className="navlink" onClick={handleTesteClick}>{textos[idiomaSelecionado]?.testes}</span>
                </div>
                <button className="btn-entrar" onClick={handleLoginClick}>{textos[idiomaSelecionado]?.entrar}</button>
              </div>
            </header>

      <main className="conteudo-rotinas">
        <div className="progresso-bolinhas">
          {etapasFiltradas.map((_, index) => (
            <span
              key={index}
              className={`bolinha ${index === etapaAtual ? 'ativa' : ''}`}
            ></span>
          ))}
        </div>
        <h2>{etapasFiltradas[etapaAtualFiltrada]?.titulo}</h2>
        <div className="formulario">{etapasFiltradas[etapaAtualFiltrada]?.conteudo}</div>
        {dadosGrafico.length > 0 && etapaAtual === etapasFiltradas.length - 1 && (
          <div>
            <div style={{ width: '100%', maxWidth: '600px', margin: '40px auto' }}>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={dadosGrafico}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="categoria" />
      <YAxis label={{ value: 'kgCO2', angle: -90, position: 'insideLeft' }} />
      <Tooltip content={renderTooltipContent} />
      <Bar dataKey="valor">
        {dadosGrafico.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</div>
            <div>
              <p className="pergunta">
                Total de emissões: {calcularEmissoesSeparadas().testeData.emissaoTotal.toFixed(2)} kgCO2. Deseja salvar seu teste e acompanhar a evolução da sua pegada de carbono mensalmente? Cadastre-se agora gratuitamente!
              </p>
            </div>
          </div>
        )}
        <div className="botoes-navegacao">
          {etapaAtual > 0 && (
            <button className="botao secundario" onClick={voltarEtapa}>
              {textos[idiomaSelecionado]?.BotaoVoltar}
            </button>
          )}
          {etapaAtual < etapasFiltradas.length - 2 && (
            <button className="botao primario" onClick={avancarEtapa}>
              {textos[idiomaSelecionado]?.BotaoAvancar}
            </button>
          )}
          {etapaAtual === etapasFiltradas.length - 2 && (
            <button className="botao primario" onClick={(handleCalcular)}>
              {textos[idiomaSelecionado]?.TituloCalcular}
            </button>
          )}
          {etapaAtual === etapasFiltradas.length - 1 && (
            <button className="botao primario" onClick={(handleLoginClick)}>
              {textos[idiomaSelecionado]?.BotaoCadastreSe}
            </button>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>{textos[idiomaSelecionado]?.rodape}</p>
      </footer>
    </div>
  );
};

export default Teste;