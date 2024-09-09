const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Create - Cadastrar um novo usuário
router.post('/users', async (req, res) => {
  try {
    const { nome, usuario, senha } = req.body;
    const newUser = new User({ nome, usuario, senha });
    await newUser.save();
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read - Buscar todos os usuários
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read - Buscar um usuário pelo ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update - Atualizar um usuário
router.put('/users/:id', async (req, res) => {
  try {
    const { nome, usuario, senha } = req.body;
    let updatedUser = { nome, usuario };

    if (senha) {
      const salt = await bcrypt.genSalt(10);
      updatedUser.senha = await bcrypt.hash(senha, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updatedUser, { new: true });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete - Deletar um usuário
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
