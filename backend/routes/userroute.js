const express = require("express");
const userdetails = require("../controller/userdata");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
router.post("/userdetails", upload.single("profilePic"), userdetails);

module.exports = router;
