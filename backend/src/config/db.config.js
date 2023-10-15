const mongoose = require("mongoose");
const dotenv = require("dotenv");
const db_url = process.env.DBURL;

const dbConnection = async (req, res) => {
  console.log("inside DB connection");
  await mongoose.connect(db_url);
  console.log("DB connection established");
};

module.exports = dbConnection;
