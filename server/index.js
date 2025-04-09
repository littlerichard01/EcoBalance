// server/index.js
const express = require('express');
const path = require('path');
const connectDB = require('./database');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// Conectar ao banco
connectDB();

// Middleware para JSON
app.use(express.json());

// API de exemplo
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server and MongoDB!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});