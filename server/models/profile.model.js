const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minLength: [4, "Minimo 4 de Caracteres para Ingresar un Email"],
      unique: true,
    },
    password: {
      type: String,
      required : true,
      minLength: [4, "Minimo 4 de Caracteres para crear tu contraseña"],
    },
  },
  { timestamps: true }
);

module.exports.Profile = mongoose.model("Profile", ProfileSchema);
