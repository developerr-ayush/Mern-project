const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/listing";
const { Listing } = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExprssError");
const { stat } = require("fs");
const { listingSchema } = require("./schema.js");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", engine);
// connection to DB
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}
// listing to port
app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});

// show listing
app.get(
  "/",
  wrapAsync(async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listing/show", { allListings });
  })
);

// adding listing
app.post("/listing", (req, res) => {
  let result = listingSchema.validate(req.body);
  if (result.error) {
    throw new ExpressError(400, result.error);
  }
  new Listing(req.body.listing).save();
  res.redirect("/");
});

// add listing
app.get("/listing/new", (req, res) => {
  res.render("listing/new");
});

// show details
app.get(
  "/listing/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    let dataList = await Listing.findById(id);

    res.render("listing/details", { dataList });
  })
);

// show update listing form
app.get(
  "/listing/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listing/update", { listing });
  })
);

// update listing
app.post(
  "/listing/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    let result = listingSchema.validate(req.body);
    if (result.error) {
      throw new ExpressError(400, result.error.details[0].message);
    }
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listing/${id}`);
  })
);
// delete listingx
app.delete(
  "/listing/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await Listing.findByIdAndDelete(id);
    res.redirect("/");
  })
);
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(message);
});
