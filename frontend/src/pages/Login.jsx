// frontend/src/pages/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login</h1>
      <p>Faça login para continuar.</p>
      <Link to="/">Voltar para Home</Link>
    </div>
  );
}

export default Login;
