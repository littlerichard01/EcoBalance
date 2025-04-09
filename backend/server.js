// backend/server.js
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5000;

// Conecta ao MongoDB e só então inicia o servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
});
