const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
}).then(() => {
  console.log('Conectado ao MongoDB Atlas');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB Atlas', err);
});

// Rotas
app.use('/api', userRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
