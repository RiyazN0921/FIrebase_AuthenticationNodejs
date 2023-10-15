const jwt = require("jsonwebtoken");
const firebase = require("firebase-admin");
const jwt_secrete = process.env.JWT_SECRET_KEY;

const verifyAuthToken = async (req, res, next) => {
  const token = req.headers.authorization; 

  if (!token) {
    return res.status(401).json({ error: "Authorization token is missing" });
  }

  try {
    const decodedToken = jwt.verify(token, jwt_secrete);
    const user = await firebase.auth().getUser(decodedToken.uid);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = {
  verifyAuthToken,
};
