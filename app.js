const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/listing";
const { Listing } = require("./models/listing.js");
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
// show all listings
app.get("/", async (req, res) => {
  let allListings = await Listing.find({});
  res.render("home", { allListings });
});
app.get("listing/new", (req,res)=>{
  res.render("listing/add")
})
app.post("listing/new", (req,res)=>{
  // res.render("listing/add")
})

// show details
app.get("/listing/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  let dataList = await Listing.findById(id);
  res.render("listing/details", { dataList });
});
