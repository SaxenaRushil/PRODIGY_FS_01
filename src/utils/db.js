const mongoose = require("mongoose");

const DATABASE_URL = "mongodb://127.0.0.1/prodigytask1";

const connect = async () => {
  try {
    console.log("Attempting to connect to the database...");
    await mongoose.connect(DATABASE_URL, {
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    });
    console.log("Connected to the database successfully");
  } catch (err) {
    console.log("Error: ", err);
  }
};

// Call the connect function when this script is run
connect();

module.exports = connect;
