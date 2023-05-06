const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/crm", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Tenemos conexion con la base de datos"))
    .catch(err => console.log("Tenemos un error de conexion con la base de datos", err));
