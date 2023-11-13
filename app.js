const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/listing";
const { Listing } = require("./models/listing.js");
const path = require("path")
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}
app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
app.get("/", async (req, res) => {
  let allListings = await Listing.find({});
  console.log(alllistings)
  res.render("listings/home", allListings);
});
