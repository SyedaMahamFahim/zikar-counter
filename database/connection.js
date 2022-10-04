const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "configuration/config.env" });

const URL =`mongodb+srv://${process.env.DB_URL_ADMIN_USERNAME}:${process.env.DB_URL_PASSWORD}@cluster0.8fkqg1p.mongodb.net/?retryWrites=true&w=majority`


const connectDatabase = () => {
  mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((error) => {
      console.log("Something went wrong due to this error: ", error);
    });
};

module.exports = connectDatabase;
