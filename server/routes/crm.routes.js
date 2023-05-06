const userController = require("../controllers/user.controller");
const CompController = require("../controllers/company.controller");
const meetController = require("../controllers/meeting.controller");
const multerController = require("../controllers/multer");
const ProfileController = require("../controllers/profile.controller");

module.exports = function (app) {
  app.get("/api/user", userController.findAllUser);
  app.post("/api/user", multerController.upload, userController.createUser);
  app.get("/api/user/:id", userController.getUserId);
  app.put("/api/user/:id", userController.updateUser);
  app.delete("/api/user/:id", userController.deleteUser);
  app.get("/api/usercompany/:id", userController.getUserCompany);

  app.get("/api/company", CompController.findAllCompany);
  app.post("/api/company", CompController.createCompany);
  app.get("/api/company/:id", CompController.getCompanyId);
  app.put("/api/company/:id", CompController.updateCompany);
  app.delete("/api/company/:id", CompController.deleteCompany);

  app.get("/api/meet", meetController.findAllMeet);
  app.post("/api/meet", meetController.createMeet);
  app.get("/api/meet/:id", meetController.getMeetId);
  app.put("/api/meet/:id", meetController.updateMeet);
  app.delete("/api/meet/:id", meetController.deleteMeet);

  app.post("/api/auth/register", ProfileController.createProfile);
  app.post("/api/auth/login", ProfileController.loginProfile);
};
