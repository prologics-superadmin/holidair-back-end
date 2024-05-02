const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");

function verifyToken(req, res, next) {
  try {
    // Extract the token from the "Authorization" header
    // const token = req.headers.authorization;

    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Token missing" });
    }

    jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET_KEY,
      (err, decoded) => {
        if (err) {
          console.error(err);
          return res
            .status(401)
            .json({ message: "Unauthorized - Invalid token" });
        }

        // The token is valid, and `decoded` contains the payload
        req.user = decoded; // Attach the user information to the request, if needed
        next();
      }
    );
  } catch (error) {
    res.status(401).json({ error: "Unauthorized - Invalid token"});
  }
}

module.exports = verifyToken;
