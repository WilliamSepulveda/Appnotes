require('dotenv').config();
const User = require('./models/userModel.cjs');

async function test() {
  const userModel = new User();

  try {
    // Crear usuario de prueba
    const result = await userModel.createUser('willy@correo.com', '010203','william');
    console.log('Usuario creado con ID:', result.insertedId);

    // Buscar usuario por email
    const user = await userModel.findByEmail('will@correo.com');
    console.log('Usuario encontrado:', user);

  } catch (error) {
    console.error('Error modelo usuario:', error.message);
  }
}

test();
