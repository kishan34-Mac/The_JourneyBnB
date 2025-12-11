const path = require('path');
// Load environment variables FIRST
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.MONGO_URL;

// Check if connection string is loaded
if (!MONGO_URL) {
    console.log("Error: MONGO_URL is undefined. Check your .env file.");
    process.exit(1);
}

main()
  .then(() => {
    console.log("Connected to DataBase");
    // Run initDB only after connection succeeds
    return initDB();
  })
  .catch((err) => {
    console.log("Connection failed:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("Data was createddd");
};
