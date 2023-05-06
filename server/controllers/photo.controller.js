const express = require("express");
const router = express.Router();
const path = require("path");

router.get("public/uploads/:filename", (req, res) => {
  const { filename } = req.params;
  const filepath = path.join(__dirname, "", filename);
  res.sendFile(filepath);
});

module.exports = router;