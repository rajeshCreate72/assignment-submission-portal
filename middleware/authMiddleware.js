const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
        return res.status(403).json({ message: "Token is not valid" });
    }

    req.user = user; // Attach the decoded user information to the request object
    next();
  });
};

module.exports = authenticateToken;