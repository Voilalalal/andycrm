const mongoose = require('mongoose');
const { CompanySchema } = require('./company.model'); 
const { UserSchema } = require('./user.model'); 



const MeetingSchema = new mongoose.Schema({
title: { 
    type: String,
    required: true, 
    minLength: [
        3,
        "Minimo 3 de Caracteres para Ingresar un Titulo"
    ]
},
description: { 
    type: String,
    minLength: [
        3,
        "Minimo 3 de Caracteres para Ingresar un Descripcion"
    ]
},
date: { 
    type: Date,
    required: true
},
company: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company' 
},
attendees: [{ 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User' 
}]


}, { timestamps: true });

module.exports.Meeting = mongoose.model('Meeting', MeetingSchema);

