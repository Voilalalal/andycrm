const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
name: { 
    type: String,
    required: true,
    minLength: [
        3,
        "Minimo 3 de Caracteres"
    ]
},
address: { 
    type: String,
    required : true,
    minLength: [
        3,
        "Minimo 3 de Caracteres"
    ]
},
phone: { 
    type: String,
    required : true,
    minLength: [
        7,
        "Minimo 7 de Caracteres"
    ]
},
email: { 
    type: String,
    required : true,
    minLength: [
        3,
        "Minimo 3 de Caracteres"
    ]
},
zipcode: { 
    type: Number,
    required : true,
    minLength: [
        2,
        "Minimo 2 de Caracteres"
    ]
}

}, { timestamps: true });

module.exports.Company = mongoose.model('Company', CompanySchema);
