const mongoose = require("mongoose");
const { CompanySchema } = require("./company.model");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Minimo 3 de Caracteres para Ingresar un Nombre"],
    },
    lastName: {
      type: String,
      required: true,
      minLength: [3, "Minimo 3 de Caracteres para Ingresar un Apellido"],
    },
    email: {
      type: String,
      required: true,
      minLength: [4, "Minimo 4 de Caracteres para Ingresar un Email"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "regular"],
      default: "regular",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    photo: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports.User = mongoose.model("User", UserSchema);
