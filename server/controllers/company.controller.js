const { Company } = require('../models/company.model');

module.exports.findAllCompany = (request, response) => {
    Company.find({}).sort({name: 1})
    .then(allCompany => response.json(allCompany))
    .catch(err => response.json({ message: "Something went wrong", error: err }));
}

module.exports.createCompany = (request, response) => {
    const {name, address,phone,email,zipcode} = request.body;
    Company.create({
    name, 
    address, 
    phone,
    email,
    zipcode
    })
    .then(company => response.json(company))
    .catch(err => response.status(400).json(err));
}

module.exports.getCompanyId = async (request, response) => {
    await Company.findOne({_id: request.params.id})
        .then(company => response.json(company))
        .catch(err => response.json(err))
}

module.exports.updateCompany = (request, response) => {
    Company.findOneAndUpdate({_id: request.params.id}, request.body, { new: true, runValidators: true })
        .then(uptdCompany => response.json(uptdCompany))
        .catch(err => response.status(400).json(err));
}

module.exports.deleteCompany = async (request, response) => {
    await Company.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}
