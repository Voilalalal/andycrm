const { User } = require("../models/user.model");
const { upload } = require("../controllers/multer");


module.exports.findAllUser = (request, response) => {
  User.find({})
    .sort({ name: 1 })
    .populate()
    .then((allUsers) => response.json(allUsers))
    .catch((err) =>
      response.json({ message: "Something went wrong", error: err })
    );
};

module.exports.createUser = async (req, res) => {
  const { name, lastName, email, role, company } = req.body;
  const photo = req.file ? `${req.file.filename}` : null;
  await User.create({
    name,
    lastName,
    email,
    role,
    company,
    photo,
  })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(err));
};


module.exports.getUserId = async (request, response) => {
  await User.findOne({ _id: request.params.id })
    .then((user) => response.json(user))
    .catch((err) => response.json(err));
};

module.exports.updateUser = (request, response) => {
  User.findOneAndUpdate({ _id: request.params.id }, request.body, {
    new: true,
    runValidators: true,
  })
    .then((uptdUser) => response.json(uptdUser))
    .catch((err) => response.status(400).json(err));
};

module.exports.deleteUser = async (request, response) => {
  await User.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err));
};

module.exports.getUserCompany = async (request, response) => {
  await User.find({ company: request.params.id }).populate()
    .then((users) => response.json(users))
    .catch((err) => response.json(err));
};

