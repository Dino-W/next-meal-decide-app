require("dotenv").config();
const mongoose = require("mongoose");

const connstr = process.env.CON_STR;

mongoose.set("strictQuery", true);

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(connstr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

const db = mongoose.connection;

db.on("error", (err) => {
  console.error.bind(console, "connection error:");
});

db.once("open", function () {
  console.log("Connected to MongoDB");
});

module.exports = connectDB;
