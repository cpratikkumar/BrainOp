const cookieParser = require("cookie-parser");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const authentication = (req, res, next) => {
  // Initialize and use cookie-parser middleware to parse cookies
  cookieParser()(req, res, () => {
    // Extract JWT token from cookies
    const jwtToken = req.cookies.jwt;

    if (!jwtToken) {
      // JWT token is missing, return 401 Unauthorized
      return res.status(401).json({ message: "JWT token missing" });
    }

    try {
      // Verify JWT token with the secret key
      const jwtDecoded = jsonwebtoken.verify(jwtToken, process.env.SECRET_KEY);

      // Log the decoded token
      req.user = jwtDecoded;

      // Proceed to the next middleware
      next();
    } catch (error) {
      // JWT token verification failed, return 401 Unauthorized

      return res.status(401).json({ message: "Invalid JWT token" });
    }
  });
};

module.exports = authentication;
