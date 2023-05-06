const { Profile } = require("../models/profile.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const clavemy = "myclavesecreta";

module.exports.createProfile = async (req, res) => {
  const { email, password, pass_confirm } = req.body;

  if (password != pass_confirm) {
    return res.status(401).json({ error: "Las contraseñas no coinciden" });
  }
  if (password.length <= 4) {
    return res.status(401).json({ error: "Las contraseñas no es segura" });
  }

  try {
    const existingProfile = await Profile.findOne({ email: email });

    if (existingProfile) {
      return res.status(401).json({ error: "Este usuario ya existe" });
    }

    const pass_bcrypt = await bcrypt.hash(password, 10);
    Profile.create({
      email: email,
      password: pass_bcrypt,
    });

    return res.status(200).json({ status: "todo ok" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports.loginProfile = async (req, res) => {
  const { email, password } = req.body;

  const prof = await Profile.findOne({ email });

  if (prof == null) {
    return res.status(404).json({ error: "Usuario o contrasena no valida" });
  }

  const isMatch = await bcrypt.compare(password, prof.password);
  if (!isMatch) {
    return res.status(404).json({ error: "Usuario o contrasena no valida" });
  }
  const token = jwt.sign(
    {
      _id: prof._id,
    },
    clavemy
  );
  res.json({ prof: prof, token: token });
};

module.exports.check_credential = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Sin Acceso" });
  }
  const token = req.headers.authorization.split(" ")[1];
  let is_valid;
  try {
    is_valid = jwt.verify(token, clavemy);
  } catch (error) {
    return res.status(401).json({ error: "Sin Acceso" });
  }
  if (!is_valid) {
    return res.status(401).json({ error: "Sin Acceso" });
  }
  next();
};
