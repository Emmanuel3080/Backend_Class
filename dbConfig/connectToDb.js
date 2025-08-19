const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const monogoDbKey = process.env.mongodbUri;

const connectToDb = async () => {
  console.log("Connectingg..");

  try {
    const connect = await mongoose.connect(monogoDbKey);
    if (connect) {
      console.log("MongoDbConnected✅👩🏾‍💻😂");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb;
