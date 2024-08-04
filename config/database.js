const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((c) => {
      console.log(`Mongodb connect to: ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = connectDatabase;
// mongodb+srv://saikatmandi609:chuti0509@cluster0r.ks36hwx.mongodb.net/placement
