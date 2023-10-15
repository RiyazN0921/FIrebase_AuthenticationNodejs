const admin = require("firebase-admin");
const secrete = process.env.ServiceSecrete;

const serviceAccount = secrete


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
