const { Meeting } = require('../models/meeting.model');

module.exports.findAllMeet = (request, response) => {
    Meeting.find({}).sort({name: 1})
    .then(allMeet => response.json(allMeet))
    .catch(err => response.json({ message: "Something went wrong", error: err }));
}

module.exports.createMeet = (request, response) => {
    const {title, description,date,company,attendees} = request.body;
    Meeting.create({
    title, 
    description, 
    date,
    company,
    attendees
    })
    .then(meet => response.json(meet))
    .catch(err => response.status(400).json(err));
}

module.exports.getMeetId = async (request, response) => {
    await Meeting.findOne({_id: request.params.id})
        .then(meet => response.json(meet))
        .catch(err => response.json(err))
}

module.exports.updateMeet = (request, response) => {
    Meeting.findOneAndUpdate({_id: request.params.id}, request.body, { new: true, runValidators: true })
        .then(uptdMeet => response.json(uptdMeet))
        .catch(err => response.status(400).json(err));
}

module.exports.deleteMeet = async (request, response) => {
    await Meeting.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}
