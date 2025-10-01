const User = require("../models/userModel.cjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "0.5h",
    });

    res.json({ msg: "Login exitoso", token });
  } catch (err) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};



exports.createUser = async (req, res) => {
    const { userName, email, password } = req.body; // Removed 'telefono' and 'rol'

    try {
        // Check if the password is provided
        if (!password) {
            return res.status(400).json({ status: 400, message: 'Password is required.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Check if the username already exists
        let userExist = await user.findExistUserName(userName);
        if (userExist.status === 200) {
            return res.status(400).json({ status: 400, message: 'El nombre de usuario ya está en uso.' });
        }

        // Check if the email already exists
        let emailExist = await user.findExistEmail(email);
        if (emailExist.status === 200) {
            return res.status(400).json({ status: 400, message: 'El correo electrónico ya está registrado.' });
        }

        // Insert new user into the collection, including created_at timestamp
        let resUser = await user.insertCollection({ 
            userName, 
            email, 
            password: hashedPassword,
            created_at: new Date() // Set created_at to the current date
        });
        
        if (resUser.status === 200) {
            return res.status(201).json({ status: 201, message: 'Usuario creado exitosamente.' });
        } else {
            return res.status(500).json({ status: 500, message: 'Error al crear el usuario.' });
        }
    } catch (error) {
        console.error('Error al crear el usuario:', error.message);
        let err;
        try {
            err = JSON.parse(error.message);
        } catch {
            err = { status: 500, message: 'Error interno del servidor.' };
        }
        res.status(err.status || 500).json(err);
    }
};

