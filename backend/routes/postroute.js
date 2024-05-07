const express = require("express");
const authentication = require("../middleware/authentication");
const userAuthentication = require("../middleware/userauthentication");
const postsDetails = require("../controller/posts");
const router = express.Router();
router.get("/posts", authentication, userAuthentication, postsDetails);
module.exports = router;
