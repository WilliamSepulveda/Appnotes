const User = require('../models/userModel.cjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const userModel = new User();
  const exist = await userModel.findByEmail(email);
  if (exist) return res.status(400).json({ message: 'Usuario ya existe' });

  const result = await userModel.createUser(email, password);
  res.status(201).json({ message: 'Usuario creado', userId: result.insertedId });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const userModel = new User();
  const user = await userModel.findByEmail(email);
  if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};
