// frontend/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Página Inicial</h1>
      <p>Bem-vindo à aplicação React!</p>
      <Link to="/login">Ir para Login</Link>
    </div>
  );
}

export default Home;
