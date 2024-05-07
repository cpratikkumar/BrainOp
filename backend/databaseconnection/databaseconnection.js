const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("Mongoose connected successfully");
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = mongoConnection;
