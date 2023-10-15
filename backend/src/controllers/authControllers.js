const admin = require("../config/firebase.config"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secretKey = process.env.SECRET_KEY;

async function createUserAndSave(email, password) {
  const userRecord = await admin.auth().createUser({ email, password });
  const user = new User({ uid: userRecord.uid, email });
  await user.save();
  return user;
}

async function comparePassword(inputPassword, hashedPassword) {
  return bcrypt.compare(inputPassword, hashedPassword);
}

function generateToken(user) {
  const payload = {
    uid: user.uid,
    email: user.email,
  };

  return jwt.sign(payload, secretKey, {
    expiresIn: "1h",
  });
}

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUserAndSave(email, hashedPassword);

    const token = generateToken(user);

    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const userRecord = await admin.auth().getUserByEmail(email);

    if (!userRecord) {
      return res.status(401).json({ error: "User not found" });
    }

    const passwordMatch = await comparePassword(password, userRecord.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(userRecord);

    res.json({ user: userRecord, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
