const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/listing";
const { Listing } = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", engine);

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

// show listing
app.get("/", async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listing/show", { allListings });
});

// adding listing
app.post("/listing", (req, res) => {
  new Listing(req.body.listing).save();
  res.redirect("/");
});

// add listing
app.get("/listing/new", (req, res) => {
  res.render("listing/new");
});

// show details
app.get("/listing/:id", async (req, res) => {
  const { id } = req.params;
  let dataList = await Listing.findById(id);
  res.render("listing/details", { dataList });
});

// show update listing form
app.get("/listing/:id/edit", async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listing/update", { listing });
});

// update listing
app.post("/listing/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect("/");
});
// delete listing
app.delete("/listing/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await Listing.findByIdAndDelete(id);
  res.redirect("/");
});
