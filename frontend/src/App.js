import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    axios.get('/api/hello')
      .then(response => {
        setMensagem(response.data.message);
      })
      .catch(error => {
        console.error('Erro ao buscar mensagem do backend:', error);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{mensagem || 'Carregando mensagem...'}</h1>
    </div>
  );
}

export default App;